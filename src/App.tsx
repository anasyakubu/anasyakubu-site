import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import './styles/fonts.css';
import { Toaster } from "sonner";
import Home from "./pages/Home/Home";
import Page404 from "./pages/Page404/Page404";
import TopBar from './components/TopBar';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Work from "./pages/Work/Work";
import WorkDetail from "./pages/Work/WorkDetail";


// Routes component to wrap with AuthProvider context
const AppRoutes = () => {

  return (
    <>
      {/* <CheckUserStatus /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        {/* Catch-All Route */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

function App() {
  return (

    <div className="App font-sans">
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <TopBar />
          <Header />
          <Navbar />
          <AppRoutes />
          <Footer />
        </div>
      </BrowserRouter>

    </div>

  );
}

export default App;