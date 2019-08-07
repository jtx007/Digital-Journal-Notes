import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className="ui three item menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/login">Login</Link>
            <Link className="item" to="/signup">Sign Up</Link>
            
        </nav>
    )
}

export default Navbar