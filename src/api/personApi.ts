import {faker} from "@faker-js/faker";
import { Person, personBuilder } from "../models/Person";
import { useEffect, useState } from "react";
import ApiResult from "./ApiResult";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL + 'person/';

const mockPerson = ()=>{
    return personBuilder()
        .id(faker.number.int())
        .firstName(faker.person.firstName())
        .lastName(faker.person.lastName())
        .email(faker.internet.email())
        .gender(faker.person.gender())
        .build();
}
const sleep = (ms: number)=>new Promise((res)=>setTimeout(res, ms));

interface PersonSearchOptions {
    name?: string | null,
    page: number,
    pageSize: number
}

export const fetchPersonSearch = async (opts: PersonSearchOptions) => {
    console.log(opts);
    const result = await axios.get<Person[]>(BASE_URL + 'search', {
        params: {
            "name": opts.name || "",
            "pageIndex": opts.page,
            "pageSize": opts.pageSize
        }
    });
    return result.data;
}
export const usePersonSearch = (opts: PersonSearchOptions) => {
    const [reloadi, setReloadi] = useState(0);
    const [result, setResult] = useState<ApiResult<Person[]>>(ApiResult.loading());

    useEffect(() => {
        if(result.state != 'loading') 
            setResult(ApiResult.loading());
        fetchPersonSearch(opts).then(data=>{
            setResult(ApiResult.ready(data));
        });
    }, [opts.name, opts.page, opts.pageSize, reloadi]);
    
    return [result, ()=>void setReloadi(reloadi+1)] as const;
}
export const fetchPerson = async (id: number) => {
    const result = await axios.get<Person>(BASE_URL + id);
    return result.data;
}
export const usePerson = (id: number) => {
    const [reloadi, setReloadi] = useState(0);
    const [result, setResult] = useState<ApiResult<Person>>(ApiResult.loading());
    useEffect(()=>{
        if(result.state != 'loading') 
            setResult(ApiResult.loading());
        fetchPerson(id).then(data=>{
            setResult(ApiResult.ready(data))
        }).catch((reason)=>{
            setResult(ApiResult.error(reason))
        })
    }, [id, reloadi])
    return [result, ()=>void setReloadi(reloadi+1)] as const;
}
export const updatePerson = async (person: Person) => {
    await axios.patch(BASE_URL + person.id, person);
    return;
}
export const deletePerson = async (id: number)=>{
    await axios.delete(BASE_URL + id);
    return;
}