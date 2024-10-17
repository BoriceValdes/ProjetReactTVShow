import axios from "axios"
import { BASE_URL } from "../config"

export class TVShowAPI {
    static async fetchPopulars(){
        const response = await axios.get(`${BASE_URL}tv/popular?api_key=${process.env.REACT_APP_API_KEY}}`)
        return response.data.results
    }
    static async fetchRecommendations(tvShowTd){
        const response = await axios.get(`${BASE_URL}tv/${tvShowTd}/recommendations?api_key=${process.env.REACT_APP_API_KEY}}`)
        return response.data.results
    }
    static async fetchByTitle(title){
        const response = await axios.get(`${BASE_URL}search/tv?api_key=${process.env.REACT_APP_API_KEY}}&query=${title}`)
        return response.data.results
    }
}