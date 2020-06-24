import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';
import logo from '../../logo-tmdb.svg'
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
        const { results} = response.data;
        
        this.setState({ movies: results})
    };

    async getResults(filme){
        const response = await api.get(`/search/movie?api_key=88a2d92e0c0926858a17bfb99f70cbd6&language=pt-BR&query=${filme}`)
        console.log(response)
        this.setState({ movies: response.data.results })
    }


    render(){
    return (
        <>
        <nav>
            <Link to='/movie_page'>
                    <img src={logo} className='logo-tmdb' alt='Logo TMDB'></img>
            </Link>
            <i className='small material-icons' onClick={()=>{
                        
                const filme = document.getElementById('searchbar').value
                    if(filme === ''){
                        alert('Insira algum valor')
                    }else{
                        this.getResults(filme);
                        document.getElementById('searchbar').value = ''
                    }}}>search</i>
            <input type="text" name="search" className="searchbar" id='searchbar' placeholder='Pesquisar...'/>
        </nav>
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