import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import PersonCell from "../components/PersonCell";

import { useSearchParams } from "react-router";
import { usePersonSearch } from "../api/personApi";

const PAGE_SIZE = 6;

const PersonSearchPage = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResult] = usePersonSearch({
        name: searchParams.get('name'), 
        page: Number(searchParams.get("page")) || 0,
        pageSize: PAGE_SIZE
    });

    const handleSearch = (query: string) => {
        setSearchParams((params)=>{
            params.set('name', query);
            params.set('page', "0");
            return params;
        });
    }

    const handlePageChange = (page: number) => {
        setSearchParams((params)=>{
            params.set('page', page.toString());
            return params;
        });
    }


    const page = Number(searchParams.get("page")) || 1;
    const hasPrevPage = page > 1;
    const hasNextPage = searchResult.ready(people=>people.length > PAGE_SIZE).notReady(()=>true).unwrap();
    return (
        <div className="person-search-page">
            <SearchBar onSearch={handleSearch}/>
            <Pagination 
                page={page}
                disabled={searchResult.state !== 'ready'}
                hasPrevPage={hasPrevPage}
                hasNextPage={hasNextPage}
                onPageChange={handlePageChange} 
            />
            {searchResult
                .notReady(()=><div className="loader"/>)
                .ready(data=>{
                    return (
                        <div className="result-wrapper entry-transition">
                            <div className="result-grid">
                                {data.slice(0, PAGE_SIZE).map(person=><PersonCell key={person.id} {...person}/>)}
                            </div>
                        </div>
                    )
                })
                .unwrap()
            }
        </div>
    )
}

export default PersonSearchPage;