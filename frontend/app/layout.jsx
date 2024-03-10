import '@styles/globals.scss';

export const metadata = {
	title: 'SACC',
	description: 'Student Alumni Connect Cell',
}
const Rootlayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<div className="main">
					<div className="gradient" />

				</div>
				<main className="app">
					{children}
				</main>
			</body>
		</html>
	)
}

export default Rootlayout