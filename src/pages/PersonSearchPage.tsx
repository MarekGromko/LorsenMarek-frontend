import { Suspense, use } from "react";
import PagedPanel from "../components/PagedPanel";
import SearchBar from "../components/SearchBar";
import { Person } from "../models/Person";
import { useSearchParams } from "react-router";
import { fetchManyPerson } from "../api/personApi";
import PersonCell from "../components/PersonCell";

interface ResultWrapperProps {
    promise: Promise<Person[]>
}

const ResultWrapper = ({promise}: ResultWrapperProps) => {
    const people = use(promise);
    return (
        <PagedPanel page={1} hasNextPage={false}>
                <div className="result-grid">
                    {people.map((person)=>(
                        <PersonCell
                            key={person.id}
                            {...person}
                        />
                    ))}
                </div>
        </PagedPanel>
    )
}

const PersonSearchPage = ()=>{
    const [searchParams, seSearchParams] = useSearchParams();
    const promise = fetchManyPerson();

    return (
        <div className="person-search-page">
            <SearchBar onSearch={()=>{}}/>
            <Suspense fallback={<PagedPanel><div className="loader"/></PagedPanel>}>
                <ResultWrapper promise={promise}/>
            </Suspense>
        </div>
    )
}

export default PersonSearchPage;