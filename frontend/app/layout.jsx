export const metadata = {
	title: 'SACC',
	description: 'Student Alumni Connect Cell',
}
const Rootlayout = ({ children }) => {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
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