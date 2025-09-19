import { Serie } from "../models/Serie";
import axios from "axios";
import { hookifyFetcher } from "./Hookify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + 'serie/';

interface SerieSearchOptions {
    title?: string | null;
    minEpisode?: number | null,
    genre?: string | null
}
export const fetchSerieSearch = async (opts: SerieSearchOptions) => {
    const result = await axios.get<Serie[]>(BASE_URL + "search", {
        params: {
            "title": opts.title,
            "genre": opts.genre,
            "minEpisode": opts.minEpisode
        }
    })
    console.log(result);
    return result.data;
}
export const fetchSerie = async (id: number) => {
    const result = await axios.get<Serie>(BASE_URL + id);
    return result.data;
}
export const updateSerie = async (serie: Serie) => {
    await axios.put(BASE_URL + serie.id, serie);
    return;
}
export const deleteSerie = async (id: number)=>{
    await axios.delete(BASE_URL + id);
    return;
}

export const useSerieSearch = hookifyFetcher(fetchSerieSearch, Object.values);
export const useSerie       = hookifyFetcher(fetchSerie, id=>[id]);
