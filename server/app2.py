from flask import Flask, render_template, redirect, url_for, request, make_response, current_app
from urllib.parse import quote_plus
from functools import wraps
from os import getenv
from jwt import encode, decode
from cas import CASClient

# from db import Database, Person

questions = [{"id": 1, "text": "Who is the most popular in your batch?"},
             {"id": 2, "text": "Best athlete in your batch?"}]

persons = {1: "Amey", 2: "Prithvi", 3: "Kunal", 4: "Harsh", 5: "Ishan"}

DEBUG = getenv("DEBUG", "False").lower() in ("true", "1", "t")
SECRET_KEY = getenv("SECRET_KEY", "secret-key")
CAS_SERVER_URL = getenv("CAS_SERVER_URL")
SERVICE_URL = getenv("SERVICE_URL")
REDIRECT_URL = getenv("REDIRECT_URL", "/home")
JWT_SECRET = getenv("JWT_SECRET", "jwt-secret")
DB_USER = getenv("DB_USER")
DB_PASSWORD = getenv("DB_PASSWORD")

app = Flask(__name__, template_folder='./frontend',
            static_folder='./frontend/static')
app.secret_key = SECRET_KEY


# START OF AUTHENTICATION MODULE

# instantiate CAS client
cas_client = CASClient(
    version=3,
    service_url=f"{SERVICE_URL}?next={quote_plus(REDIRECT_URL)}",
    server_url=CAS_SERVER_URL,
)


def verify_token() -> bool:
    try:
        token = None
        if request.cookies.get("Authorization"):
            token = request.cookies.get("Authorization")
        if token:
            current_user = decode(token, JWT_SECRET, algorithms=["HS256"])
            return True
        return False
    except Exception as e:
        return False


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if request.cookies.get("Authorization"):
            token = request.cookies.get("Authorization")
        if not token:
            return redirect(url_for('login'))
        try:
            current_user = decode(token, JWT_SECRET, algorithms=["HS256"])
        except Exception as e:
            return {
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }, 500

        return f(current_user, *args, **kwargs)
    return decorated


@app.route("/login")
def login():
    # Already logged in
    if request.cookies.get("Authorization"):
        return redirect(REDIRECT_URL)

    next = request.args.get("next")
    ticket = request.args.get("ticket")
    if not ticket:
        # No ticket, the request come from end user, send to CAS login
        cas_login_url = cas_client.get_login_url()
        app.logger.debug("CAS login URL: %s", cas_login_url)
        return redirect(cas_login_url)

    # There is a ticket, the request come from CAS as callback.
    # need call `verify_ticket()` to validate ticket and get user profile.
    app.logger.debug("ticket: %s", ticket)

    user, attributes, pgtiou = cas_client.verify_ticket(ticket)

    app.logger.debug(
        "CAS verify ticket response: user: %s, attributes: %s, pgtiou: %s",
        user,
        attributes,
        pgtiou,
    )

    if not user:
        return 'Failed to verify ticket. <a href="/login">Login</a>'

    # Login successful, make JWT and redirect according to `next` query parameter.
    else:
        payload = {
            "uid": attributes.get("uid"),
            "email": user,
            "name": attributes.get("Name"),
            "roll_no": attributes.get("RollNo"),
            "first_name": attributes.get("FirstName"),
            "last_name": attributes.get("LastName"),
        }

        app.logger.debug("JWT payload: %s", payload)

        # generate JWT
        token = encode(payload, JWT_SECRET, algorithm="HS256")

        # send JWT as cookie
        response = make_response(redirect(next))
        response.set_cookie(
            "Authorization",
            token,
            httponly=True,
            secure=False,  # TODO: change in prod
            max_age=86400,  # 1 day
        )

        return response


@app.route("/logout")
def logout():
    redirect_url = url_for("logout_callback", _external=True)
    cas_logout_url = cas_client.get_logout_url(redirect_url)
    app.logger.debug("CAS logout URL: %s", cas_logout_url)

    return redirect(cas_logout_url)


@app.route("/logoutCallback")
def logout_callback():
    # Expire cookie
    response = make_response()
    response.set_cookie("Authorization", "", expires=0)
    response.set_cookie("logout", "", expires=0)

    app.logger.debug(response.headers)

    # Redirect from CAS logout request after logout successful
    return response


# END OF AUTHENTICATION MODULE


@app.route('/')
def front_page():
    logged_in = verify_token()
    if logged_in:
        return redirect(url_for('home'))
    return render_template('front_page.html')


@app.route('/home')
@login_required
def home(current_user=None):
    return render_template('home.html', username=current_user["uid"], email=current_user["email"], first_name=current_user["first_name"], last_name=current_user["last_name"], roll_no=current_user["roll_no"])


@app.route('/faq')
def faq():
    return render_template('faq.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/polls')
@login_required
def polls(current_user=None):
    return render_template('polls.html', questions=questions, persons=persons)


@app.route('/polls/submit', methods=['POST'])
@login_required
def submit_polls(current_user=None):
    selected_answers = {int(key): value for key, value in request.form.items()}
    print(selected_answers)
    return "Polls submitted successfully"


@app.route('/signup')
def signup():
    email = request.form
    print(email)
    return render_template('signup.html')


if __name__ == '__main__':
    # db = Database(
    #     dbname="sacc",
    #     user=DB_USER,
    #     password=DB_PASSWORD,
    #     host="localhost",
    # )

    # db.create_tables()

    # person = Person(
    #     name="Amey",
    #     roll_no="2022",
    #     email="abc@gmail.com",
    #     phone="1234567890",
    #     bio="I am Amey"
    # )

    # db.insert_person(person)
    # print(db.get_person("2022"))
    # print(db.get_all_persons())

    app.run(debug=DEBUG, host="0.0.0.0", port=80)
