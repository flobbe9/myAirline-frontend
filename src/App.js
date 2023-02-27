import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/NavBar.tsx";
import Footer from "./components/footer/Footer.tsx";
import SearchFlight from "./components/searchFlight/SearchFlight.tsx";
import SearchResult from "./components/searchResult/SearchResult.tsx";
import Service from "./components/service/Service.tsx";
import Jobs from "./components/jobs/Jobs.tsx";
import Contact from "./components/contact/Contact.tsx";
import About from "./components/about/About.tsx";
import Test from "./components/test/Test.tsx";


function App() {

 	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />

				<Routes>
					<Route path="/" element={<SearchFlight />}/>
					<Route path="/searchFlights" element={<SearchResult />} />
					<Route path="/service" element={<Service />}/>
					<Route path="/jobs" element={<Jobs />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about" element={<About />} />
					<Route path="/test" element={<Test />} />
				</Routes>

				<Footer />
			</BrowserRouter>
		</div>
 	);
}


export default App;