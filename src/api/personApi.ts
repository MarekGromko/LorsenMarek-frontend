import { Person } from "../models/Person";
import axios from "axios";
import { hookifyFetcher } from "./Hookify";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + 'person/';

interface PersonSearchOptions {
    name?: string | null,
    page: number,
    pageSize: number
}
export const fetchPersonSearch = async (opts: PersonSearchOptions) => {
    const result = await axios.get<Person[]>(BASE_URL + 'search', {
        params: {
            "name": opts.name || "",
            "pageIndex": opts.page,
            "pageSize": opts.pageSize
        }
    });
    return result.data;
}
export const fetchPerson = async (id: number) => {
    const result = await axios.get<Person>(BASE_URL + id);
    return result.data;
}
export const updatePerson = async (person: Person) => {
    await axios.patch(BASE_URL + person.id, person);
    return;
}
export const deletePerson = async (id: number)=>{
    await axios.delete(BASE_URL + id);
    return;
}

export const usePersonSearch = hookifyFetcher(fetchPersonSearch, Object.values);
export const usePerson = hookifyFetcher(fetchPerson, id=>[id]);