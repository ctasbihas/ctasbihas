import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import Hero from "../components/sections/Hero";
import Skills from "../components/sections/Skills";

const Home = () => {
	return (
		<main>
			<Hero />
			<About />
			<Skills />
			<FeaturedProjects />
			<Contact />
		</main>
	);
};

export default Home;
