// TODO: add docs
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navBar/NavBar.tsx";


function App() {
 	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<NavBar />}/>
					<Route path="/service" element="adf"/>
					<Route path="/jobs" element="Jobs"/>
					<Route path="/contact" Contact />
					<Route path="/about" About />
				</Routes>
			</BrowserRouter>

			<footer>
				Footer...
			</footer>
		</div>
 	);
}


export default App;