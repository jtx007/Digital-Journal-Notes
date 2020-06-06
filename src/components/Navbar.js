import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { LoginContext } from '../auth/loginContext'



const Navbar = ({ isLoggedIn, setToken, setIsLoggedIn, setUserId }) => {

    const signOut = () => {
        localStorage.clear()
        setToken("")
        setUserId("")
        setIsLoggedIn("")
    }

    const renderNavbar = () => {
        if (isLoggedIn) {
            return (
                <Fragment>
                    <Link className="item" to="/">Home</Link>
                    <button onClick={signOut} className="item ui red button">Sign Out</button>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Link className="item" to="/">Home</Link>
                    <Link className="item" to="/login">Login</Link>
                    <Link className="item" to="/register">Sign Up</Link>
                </Fragment>
            )
        }
    }

    return (
        <nav className="ui three item menu">
            {renderNavbar()}
        </nav>
    )
}

const NavbarWithContext = () => {
    return (
        <LoginContext.Consumer>
            {value => {
                return <Navbar {...value} />
            }}
        </LoginContext.Consumer>
    )
}


export default NavbarWithContext;