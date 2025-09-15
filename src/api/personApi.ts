import {faker} from "@faker-js/faker";
import { Person, personBuilder } from "../models/Person";
import { useEffect, useRef, useState } from "react";
import ApiResult from "./ApiResult";


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
    await sleep(2000);
    return faker.helpers.multiple(mockPerson, {count: 20});
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
    await sleep(2000);
    return mockPerson();
}

export const usePerson = (id: number) => {
    const [reloadi, setReloadi] = useState(0);
    const [result, setResult] = useState<ApiResult<Person>>(ApiResult.loading());
    useEffect(()=>{
        if(result.state != 'loading') 
            setResult(ApiResult.loading());
        fetchPerson(id).then(data=>{
            setResult(ApiResult.ready(data))
        })
    }, [id, reloadi])
    return [result, ()=>void setReloadi(reloadi+1)] as const;
}
export const updatePerson = async (person: Person) => {
    await sleep(2000);
    return;
}

export const deletePerson = async (id: number)=>{
    await sleep(2000);
    return;
}