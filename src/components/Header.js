import React, { Component } from 'react';
import logo from '../logo-tmdb.svg'
import './Header.css'
import { Link } from 'react-router-dom'

export default class Header extends Component{
    render(){
        return(
            <nav>
                <Link to='/movie_page'>
                    <img src={logo} className='logo-tmdb' alt='Logo TMDB'></img>
                </Link>
                <Link to='/search_page'>
                    <i className='small material-icons'>search</i>
                </Link>
        </nav>
        )
    }
}