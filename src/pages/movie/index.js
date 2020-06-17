import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';
import Header from '../../components/Header'


export default class Movie extends Component{
    state = {
        movie: {},
    };

    async componentDidMount(){
        const { id } = this.props.match.params;

        const response = await api.get(`/movie/${id}?api_key=88a2d92e0c0926858a17bfb99f70cbd6&language=pt-BR`)
        this.setState({ movie: response.data})
    }
    render(){
        const { movie } = this.state;
        let nota = movie.vote_average;
        if(movie.vote_average === 0 && movie.vote_count === 0) nota = 'Não Avaliado';
        
        let star = []
        while(Math.round(nota/2)){
            star.push(<span className="fa fa-star checked"></span>)
        }
        return(
            <>
            <Header />
            <div className='movie'>
                <img src={'https://image.tmdb.org/t/p/w342' + movie.poster_path} alt={movie.title + ' poster'}/>
                <div className='movie-info'>
                    <h1 className='title'>{movie.title}</h1>
                    <h3 className='original-title'>'{movie.original_title}'</h3>
                    <p>Sinopse: {movie.overview}</p>
                    <p>Custos: US$ {Number(movie.budget).toLocaleString('en-US')}</p>
                    <p>Nota: {nota}</p>
                    {star}
                    <span className="fa fa-star"></span>
                    <span className ="fa fa-star"></span>
                </div>
            </div>
            </>
        )
    }
}