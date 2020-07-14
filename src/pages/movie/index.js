import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';
import Header from '../../components/Header';

const API_KEY = '88a2d92e0c0926858a17bfb99f70cbd6';

export default class Movie extends Component{
    state = {
        movie: {},
        cast: [],
        crew: [],
        loading: true,
    };

    async componentDidMount(){
        const { id } = this.props.match.params;

        const response = await api.get(`/movie/${id}?api_key=${API_KEY}&language=pt-BR`)
        this.setState({ movie: response.data, loading: false})

        const credits = await api.get(`/movie/${id}/credits?api_key=${API_KEY}`)
        this.setState({cast: credits.data.cast.slice(0,8), crew: credits.data.crew})
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
        return (cast.map(actor =>(
            <div className='actor' key={actor.id}>
                <figure>
                <img src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`} aria-hidden alt={`${actor.name} photo`}/>
                <figcaption>{actor.name}</figcaption>
                </figure>
            </div>
        )))
    }

    getCrew = () =>{
        const { crew } = this.state;
        const directors = crew.filter((el) =>{
            return el.job === "Director"})
        const dir = []
        directors.map(job => (
            dir.push(job.name)
        ))
        return dir.join(', ')
    }

    getYear = () =>{
        const { movie } = this.state;
        return movie.release_date.substring(0,4)
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
                <img src={'https://image.tmdb.org/t/p/w342' + movie.poster_path} alt={movie.title + ' poster'} className='poster'/>
                <div className='movie-info'>
                    <h1 className='title'>{movie.title}</h1>
                    <h3 className='original-title'>'{movie.original_title}'</h3>
                    <h4>{this.state.loading ? "Loading" : this.getYear()}</h4>
                    <p>Sinopse:</p>
                    <p>{movie.overview}</p>
                    Gêneros: {this.state.loading ? "Loading" : this.getGen()}.
                    <p>Elenco:</p> 
                    <div className='cast'>{this.state.loading ? "Loading" : this.getCast()}</div> 
                    <p>Direção: {this.state.loading ? "Loading" : this.getCrew()}</p>
                    <p>Orçamento: {movie.budget === 0 ? "Não informado" : "US$" + Number(movie.budget).toLocaleString('en-US')}</p>
                    <p>Nota: {nota}</p>
                    <h1>{star}</h1>
                </div>
            </div>
            </>
        )
    }
}