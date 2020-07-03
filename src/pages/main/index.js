import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import logo from '../../logo-tmdb.svg'
import { Link } from 'react-router-dom';
const API_KEY = '88a2d92e0c0926858a17bfb99f70cbd6';
 
export default class Main extends Component {
    state = {
        movies: [],
    }
    componentDidMount(){
        this.loadMovies();
    }
    loadMovies = async() => {   
        const response = await api.get(`/trending/movie/day?api_key=${API_KEY}`)
        const { results} = response.data;
        
        this.setState({ movies: results})
    };

    async getResults(){

        const filme = document.getElementById('searchbar').value
        if(filme === ''){
            alert('Insira algum valor')
        }else{
            const response = await api.get(`/search/movie?api_key=${API_KEY}&language=pt-BR&query=${filme}`)
            this.setState({ movies: response.data.results })                        
            document.getElementById('searchbar').value = ''
        }
    }

    render(){
    return (
        <>
        <nav>
            <img src={logo} className='logo-tmdb' title='Home' alt='Logo TMDB' onClick={this.loadMovies}></img>
            <button className='btn-search' onClick={()=>{this.getResults()}} title='Pesquisar'>
                <i className='material-icons'>search</i>
            </button>
            <input type="text" name="search" className="searchbar" id='searchbar' placeholder='Pesquisar...' onKeyDown={(event)=>{
                if(event.key === 'Enter') {this.getResults()}
            }}/>
            
        </nav>
        <div className='trending'>
            {this.state.movies.map(movie => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                    <article key={movie.id}>
                        <img src={'https://image.tmdb.org/t/p/w185' + movie.poster_path} title={movie.title} alt={movie.title + ' poster'}></img>
                        {movie.title}
                    </article>
                </Link>
            ))}
        </div>
        </>
        )
    }
}