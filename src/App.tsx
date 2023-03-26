import './App.css';
import React from 'react';
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
import BookingOptions from './components/bookingOptions/BookingOptions.tsx';
import Register from './components/userDetails/Register.tsx';
import Login from './components/userDetails/Login.tsx';
import ConfirmEmail from './components/userDetails/ConfirmEmail.tsx';
import BuyNow from './components/buyNow/BuyNow.tsx';


export default function App() {
 	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />

				<Routes>
					<Route path="/" element={<SearchFlight />} />
					<Route path="/searchResult/:from/:to/:date/:time" element={<SearchResult />} />
					<Route path="/searchResult/bookingOptions/:id" element={<BookingOptions />} />
					<Route path="/register/confirmEmail" element={<ConfirmEmail />} />
					<Route path="/buyNow" element={<BuyNow />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/service" element={<Service />}/>
					<Route path="/jobs" element={<Jobs />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about" element={<About />} />
					<Route path="/test" element={<Test />} />
					<Route path="*" element={<h1>Oops, page NOT FOUND</h1>} />
				</Routes>

				<Footer />
			</BrowserRouter>
		</div>
 	);
}