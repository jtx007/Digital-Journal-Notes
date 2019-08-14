import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { sign_out } from '../actions/index'



const Navbar = (props) => {

    const renderNavbar = () => {
        if (props.isLoggedIn) {
            return (
                <Fragment>
                    <Link className="item" to="/">Home</Link>
                    <button onClick={props.sign_out} className="item ui red button">Sign Out</button>
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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        token: state.auth.token,
        user_id: state.auth.user_id
    }
}

export default connect(mapStateToProps, { sign_out })(Navbar)