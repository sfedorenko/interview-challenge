import React from 'react';
import { ReactComponent as Logo } from '../assets/img/logo-symbol.svg';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <Link className="logo" to='/' >
                <Logo />
            </Link>
        </header>
    );
}

export default Header;
