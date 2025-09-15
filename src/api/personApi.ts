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

export const usePersonSearch = (opts: PersonSearchOptions, force?: boolean): ApiResult<Person[]> => {
    const forceRef = useRef(0);
    const [result, setResult] = useState<ApiResult<Person[]>>(new ApiResult('loading'));
    if(force) forceRef.current = forceRef.current+1;

    useEffect(() => {
        if(result.state != 'loading') 
            setResult(new ApiResult('loading'));
        fetchPersonSearch(opts).then(data=>{
            setResult(new ApiResult('ready', data));
        });
    }, [opts.name, opts.page, opts.pageSize, forceRef.current]);
    return result;
}