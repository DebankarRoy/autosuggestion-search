import "./globals.css";

export const metadata = {
	title: "Auto Suggestion Search",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
