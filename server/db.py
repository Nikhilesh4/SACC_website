from psycopg2 import sql, connect


class Person:
    def __init__(self, name, roll_no, email, phone, bio):
        self.name = name
        self.roll_no = roll_no
        self.email = email
        self.phone = phone
        self.bio = bio

    def __str__(self):
        return f"{self.name} {self.roll_no} {self.email} {self.phone} {self.bio}"


class Database:
    def __init__(self, dbname, user, password, host):
        self.dbname = dbname
        self.user = user
        self.password = password
        self.host = host

    def connect(self):
        try:
            conn = connect(
                dbname=self.dbname,
                user=self.user,
                password=self.password,
                host=self.host,
            )
            return conn

        except Exception as e:
            print(e)
            return None

    TABLE_PERSONS = "persons"
    TABLE_ABOUT_QUESTIONS = "about_questions"
    TABLE_ABOUT_RESPONSES = "about_responses"
    TABLE_POLLS_QUESTIONS = "polls_questions"
    TABLE_POLLS_RESPONSES = "polls_responses"

    def create_tables(self):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd_persons = sql.SQL(
                """
                CREATE TABLE IF NOT EXISTS {TABLE_PERSONS} (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    roll_no TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    bio TEXT NOT NULL
                );
                """
            ).format(
                TABLE_PERSONS=sql.Identifier(self.TABLE_PERSONS)
            )
            cmd_about_questions = sql.SQL(
                """
                CREATE TABLE IF NOT EXISTS {TABLE_ABOUT_QUESTIONS} (
                    id SERIAL PRIMARY KEY,
                    text TEXT NOT NULL,
                    description TEXT NOT NULL
                );
                """
            ).format(
                TABLE_ABOUT_QUESTIONS=sql.Identifier(
                    self.TABLE_ABOUT_QUESTIONS)
            )
            cmd_about_responses = sql.SQL(
                """
                CREATE TABLE IF NOT EXISTS {TABLE_ABOUT_RESPONSES} (
                    id SERIAL PRIMARY KEY,
                    question_id INT NOT NULL,
                    person_id INT NOT NULL,
                    answer TEXT NOT NULL,
                    FOREIGN KEY (question_id) REFERENCES {TABLE_ABOUT_QUESTIONS}(id),
                    FOREIGN KEY (person_id) REFERENCES {TABLE_PERSONS}(id),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                """
            ).format(
                TABLE_ABOUT_RESPONSES=sql.Identifier(
                    self.TABLE_ABOUT_RESPONSES),
                TABLE_ABOUT_QUESTIONS=sql.Identifier(
                    self.TABLE_ABOUT_QUESTIONS),
                TABLE_PERSONS=sql.Identifier(self.TABLE_PERSONS)
            )
            cmd_polls_questions = sql.SQL(
                """
                CREATE TABLE IF NOT EXISTS {TABLE_POLLS_QUESTIONS} (
                    id SERIAL PRIMARY KEY,
                    text TEXT NOT NULL,
                    description TEXT NOT NULL
                );
                """
            ).format(
                TABLE_POLLS_QUESTIONS=sql.Identifier(
                    self.TABLE_POLLS_QUESTIONS)
            )
            cmd_polls_responses = sql.SQL(
                """
                CREATE TABLE IF NOT EXISTS {TABLE_POLLS_RESPONSES} (
                    id SERIAL PRIMARY KEY,
                    question_id INT NOT NULL,
                    person_id INT NOT NULL,
                    option_id INT NOT NULL,
                    FOREIGN KEY (question_id) REFERENCES {TABLE_POLLS_QUESTIONS}(id),
                    FOREIGN KEY (person_id) REFERENCES {TABLE_PERSONS}(id),
                    FOREIGN KEY (option_id) REFERENCES {TABLE_PERSONS}(id),
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                """
            ).format(
                TABLE_POLLS_RESPONSES=sql.Identifier(
                    self.TABLE_POLLS_RESPONSES),
                TABLE_POLLS_QUESTIONS=sql.Identifier(
                    self.TABLE_POLLS_QUESTIONS),
                TABLE_PERSONS=sql.Identifier(self.TABLE_PERSONS)
            )

            cur.execute(cmd_persons)
            cur.execute(cmd_about_questions)
            cur.execute(cmd_about_responses)
            cur.execute(cmd_polls_questions)
            cur.execute(cmd_polls_responses)

            conn.commit()
            cur.close()
            conn.close()

    def insert_person(self, person):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cur.execute(
                """
                INSERT INTO persons (name, roll_no, email, phone, bio)
                VALUES (%s, %s, %s, %s, %s);
                """,
                (person.name, person.roll_no, person.email, person.phone, person.bio)
            )
            conn.commit()
            cur.close()
            conn.close()
            return True
        return False

    def get_person(self, roll_no):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd = sql.SQL(
                """
                SELECT * FROM {TABLE_PERSONS} WHERE roll_no = %s;
                """
            ).format(
                TABLE_PERSONS=sql.Identifier(self.TABLE_PERSONS)
            )
            cur.execute(cmd, (roll_no,))
            person = cur.fetchone()
            cur.close()
            conn.close()
            if person:
                return Person(person[1], person[2], person[3], person[4], person[5])
        return None

    def get_all_persons(self):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd = sql.SQL(
                """
                SELECT id, name, roll_no FROM {TABLE_PERSONS};
                """
            ).format(
                TABLE_PERSONS=sql.Identifier(self.TABLE_PERSONS)
            )
            cur.execute(cmd)
            persons = cur.fetchall()
            cur.close()
            conn.close()
            if persons:
                list_persons = []
                for person in persons:
                    list_persons.append(
                        {"id": person[0], "name": person[1], "roll_no": person[2]})
                return list_persons
        return None

    def get_all_about_questions(self):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd = sql.SQL(
                """
                SELECT * FROM {TABLE_ABOUT_QUESTIONS};
                """
            ).format(
                TABLE_ABOUT_QUESTIONS=sql.Identifier(
                    self.TABLE_ABOUT_QUESTIONS)
            )
            cur.execute(cmd)
            questions = cur.fetchall()
            cur.close()
            conn.close()
            if questions:
                list_questions = []
                for question in questions:
                    list_questions.append(
                        {"id": question[0], "text": question[1], "description": question[2]})
                return list_questions
        return None

    def get_all_polls_questions(self):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd = sql.SQL(
                """
                SELECT * FROM {TABLE_POLLS_QUESTIONS};
                """
            ).format(
                TABLE_POLLS_QUESTIONS=sql.Identifier(
                    self.TABLE_POLLS_QUESTIONS)
            )
            cur.execute(cmd)
            questions = cur.fetchall()
            cur.close()
            conn.close()
            if questions:
                list_questions = []
                for question in questions:
                    list_questions.append(
                        {"id": question[0], "text": question[1], "description": question[2]})
                return list_questions
        return None

    def insert_about_response(self, question_id, person_id, answer):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd = sql.SQL(
                """
                INSERT INTO {TABLE_ABOUT_RESPONSES} (question_id, person_id, answer)
                VALUES (%s, %s, %s);
                """
            ).format(
                TABLE_ABOUT_RESPONSES=sql.Identifier(
                    self.TABLE_ABOUT_RESPONSES)
            )
            cur.execute(cmd, (question_id, person_id, answer))
            conn.commit()
            cur.close()
            conn.close()
            return True
        return False

    def insert_polls_response(self, question_id, person_id, option_id):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd = sql.SQL(
                """
                INSERT INTO {TABLE_POLLS_RESPONSES} (question_id, person_id, option_id)
                VALUES (%s, %s, %s);
                """
            ).format(
                TABLE_POLLS_RESPONSES=sql.Identifier(
                    self.TABLE_POLLS_RESPONSES)
            )
            cur.execute(cmd, (question_id, person_id, option_id))
            conn.commit()
            cur.close()
            conn.close()
            return True
        return False

    def user_profile_created(self, roll_no):
        conn = self.connect()
        if conn:
            cur = conn.cursor()
            cmd = sql.SQL(
                """
                SELECT * FROM {TABLE_ABOUT_RESPONSES} WHERE roll_no = %s;
                """
            ).format(
                TABLE_ABOUT_RESPONSES=sql.Identifier(
                    self.TABLE_ABOUT_RESPONSES)
            )
            cur.execute(cmd, (roll_no,))
            response = cur.fetchone()
            cur.close()
            conn.close()
            if response:
                return True
        return False
    
    