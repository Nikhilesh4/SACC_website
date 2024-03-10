const Bottom = () => {
	return (
		<section id="about" style={aboutSectionStyle}>
			<h1>About SACC</h1>
			<p style={paragraphStyle}>
				Student Alumni Connect Cell (SACC) is a student-run organization that aims to foster connections between students, alumni, and the Institute. SACC provides mentorship, organizes events, and offers resources to help students and alumni engage with their alma mater and fellow alumni.
			</p>

			<h2>Follow Us On Social Media</h2>

			<div className="social" style={SocialStyle}>
				<a href="https://www.instagram.com/alumnicell_iiith/" target="_blank">
					<img src="./assets/images/insta.png" alt="Instagram" className="social-icon" style={SocialIconStyle} />
				</a>
				<a href="https://www.facebook.com/iiith.alumnicell" target="_blank">
					<img src="./assets/images/fb.png" alt="Facebook" className="social-icon" style={SocialIconStyle} />
				</a>
				<a href="https://www.linkedin.com/company/alumni-cell-iiit-h/" target="_blank">
					<img src="./assets/images/linkedin.png" alt="LinkedIn" className="social-icon" style={SocialIconStyle} />
				</a>
			</div>
		</section>
	);
}

// Define styles as objects
const aboutSectionStyle = {
	backgroundColor: 'white', // Set your desired background color
	padding: '40px', // Adjust the padding
	textAlign: 'center', // Align text to the center
};

const paragraphStyle = {
	fontSize: '16px', // Set font size
	lineHeight: '1.5', // Set line height
};

const SocialStyle = {
	textAlign: 'center',
};

const SocialIconStyle = {
	margin: '0 10px',
	display: 'inline-block',
}

export default Bottom;
