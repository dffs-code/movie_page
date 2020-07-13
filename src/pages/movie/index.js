import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';
import Header from '../../components/Header';

const API_KEY = '88a2d92e0c0926858a17bfb99f70cbd6';

export default class Movie extends Component{
    state = {
        movie: {},
        cast: [],
        loading: true,
    };

    async componentDidMount(){
        const { id } = this.props.match.params;

        const response = await api.get(`/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
        this.setState({ movie: response.data, loading: false})

        const credits = await api.get(`/movie/${id}/credits?api_key=${API_KEY}`)
        this.setState({cast: credits.data.cast.slice(0,5)})
    }

    getGen = () => {
        const { genres } = this.state.movie;
        var gen = []
        genres.map(genre => (
            gen.push(genre.name)
        ))

        return (gen.join(', '))
    }

    getCast = () => {
        const { cast } = this.state;
        var elen = []
        cast.map(actor =>(
            elen.push(actor.name)
        ))
        return (elen.join(', '))
    }
    render(){
        const { movie } = this.state;
        let nota = movie.vote_average;
        if(movie.vote_average === 0 && movie.vote_count === 0) nota = 'Não Avaliado';
         
        const star = []
        let note = Math.round(nota/2)
        while(star.length<5){
            if(note>0){
                star.push(<span className="fa fa-star checked" key={star}></span>)
                note--;
            }else{
                star.push(<span className="fa fa-star" key={star}></span>)
            }
        }
        
        return(
            <>
            <Header />
            <div className='movie'>
                <img src={'https://image.tmdb.org/t/p/w342' + movie.poster_path} alt={movie.title + ' poster'}/>
                <div className='movie-info'>
                    <h1 className='title'>{movie.title}</h1>
                    <h3 className='original-title'>'{movie.original_title}'</h3>
                    <p>Sinopse:</p>
                    <p>{movie.overview}</p>
                    Gêneros: {this.state.loading ? "Loading" : this.getGen()}.
                    <p>Elenco: {this.state.loading ? "Loading" : this.getCast()}, entre outros.</p>
                    <p>Orçamento: US$ {Number(movie.budget).toLocaleString('en-US')}</p>
                    <p>Nota: {nota}</p>
                    <h1>{star}</h1>
                </div>
            </div>
            </>
        )
    }
}