import { Outlet } from "react-router";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

const App = () => {
	return (
		<div className="min-h-screen bg-background">
			<Navbar />
			<Outlet />
			<Footer />
		</div>
	);
};

export default App;
