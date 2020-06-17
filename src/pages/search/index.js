import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';
import Header from '../../components/Header'
import { Link } from 'react-router-dom'



export default class Search extends Component{
    state = {
        movies: [],
    }
    async getResults(filme){
        const response = await api.get(`/search/movie?api_key=88a2d92e0c0926858a17bfb99f70cbd6&language=pt-BR&query=${filme}`)
        console.log(response.data)
        this.setState({ movies: response.data })
    }

    render(){
        return(
            <>
            <Header />
                <input type="text" name="search" className="searchbar" id='searchbar' placeholder='Search'/>
                <button className='btn-search' onClick={()=>{
                        
                        const filme = document.getElementById('searchbar').value
                        if(filme === ''){
                            alert('Insira algum valor')
                        }else{
                            this.getResults(filme);
                            document.getElementById('searchbar').value = ''
                        }
                        
                }}>Pesquisar</button>
            </>
        )
    }
}