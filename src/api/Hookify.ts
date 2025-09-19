import { useEffect, useState } from "react";
import ApiResult from "./ApiResult";

export const hookifyFetcher = <
    Fetcher extends (...args: any)=>any
>(fetcher: Fetcher, depsUnwrap: (...args: Parameters<Fetcher>)=>any[]) => {
    type Result = Awaited<ReturnType<Fetcher>>;
    return (...args: Parameters<Fetcher>) => {
        const [reloadi, setReloadi] = useState(0);
        const [result, setResult] = useState<ApiResult<Result>>(ApiResult.loading());
        useEffect(()=>{
            if(result.state != 'loading') 
                setResult(ApiResult.loading());
            fetcher(...args).then((data: any)=>{
                setResult(ApiResult.ready(data))
            }).catch((reason: any)=>{
                setResult(ApiResult.error(reason))
            })
        }, [...depsUnwrap(...args), reloadi]);
        return [result, ()=>setReloadi(reloadi+1)] as const;
    }
}