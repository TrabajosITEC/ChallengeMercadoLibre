import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainLayout.css"

export default function MainLayout({ children }) {    
    return (
        <div className="flex flex-column min-h-screen bg-black-alpha-10">
            <Navbar/>
            <main className="flex-grow-1 p-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}