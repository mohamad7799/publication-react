import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>My Publication</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>

            </div>
            <div class="menu-btn"></div>
        </nav>
    );
}

export default Navbar;