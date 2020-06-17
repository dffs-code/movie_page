import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
 
export default class Main extends Component {
    state = {
        movies: [],
    }

    componentDidMount(){
        this.loadMovies();
    }
    loadMovies = async() => {   
        const response = await api.get(`/trending/movie/day?api_key=88a2d92e0c0926858a17bfb99f70cbd6`)
        const { results, ...movieInfo} = response.data;
        
        this.setState({ movies: results, movieInfo})
    };
    render(){
    return (
        <>
        <Header />
            <div className='trending'>
                {this.state.movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <article key={movie.id}>
                            <img src={'https://image.tmdb.org/t/p/w185' + movie.poster_path} alt={movie.title + ' poster'}></img>
                            {movie.title}
                        </article>
                    </Link>
                ))}
            </div>
        </>
        )
    }
}