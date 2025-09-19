import { useSearchParams } from "react-router"
import { useSerieSearch } from "../api/serieApi";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import DropDown from "../components/DropDown";
import SerieCell from "../components/SerieCell";

const SerieSearchPage = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const hints = {
        title: searchParams.get("title") || null,
        genre: searchParams.get("genre") || null,
        minEpisode: Number(searchParams.get("minEpisode")) || null
    };
    //
    const [searchResult] = useSerieSearch(hints);
    const [currentSearchType, setSearchType] = useState<keyof typeof hints>("title");

    const dispatchSearch = () => {
        setSearchParams((params)=>{
            hints.genre ? 
                params.set('genre', hints.genre) :
                params.delete('genre');
            hints.title ? 
                params.set('title', hints.title) :
                params.delete('title');
            hints.minEpisode ? 
                params.set('minEpisode', hints.minEpisode.toString()) :
                params.delete('minEpisode');
            return params;
        });
    }

    const handleSearchType = (type: keyof typeof hints)=>{
        setSearchType(type);
    }
    
    const handleSearch= (query: string) => {
        switch(currentSearchType) {
            case "minEpisode": 
                hints[currentSearchType] = Number(query) || null;
            break;
            default:
                hints[currentSearchType] = query || null;
        }
        dispatchSearch();
    }

    const handleDeleteHint = (hintName: keyof typeof hints)=>{
        hints[hintName] = null;
        dispatchSearch();
    }

    return (
        <div className="serie-search-page">
            <div className="search-row">
                <DropDown options={{
                    'title': 'Title',
                    'genre': 'Genre',
                    'minEpisode': 'nb. Episode'
                }} value={currentSearchType} onSelect={handleSearchType}/>
                <SearchBar onSearch={handleSearch}/>
            </div>
            <div className="hints-row">
                {hints.title        && <div onClick={()=>handleDeleteHint('title')} className="hints">title: {hints.title}</div>}
                {hints.genre        && <div onClick={()=>handleDeleteHint('genre')} className="hints">genre: {hints.genre}</div>}
                {hints.minEpisode   && <div onClick={()=>handleDeleteHint('minEpisode')} className="hints">nb. episode {`> ${hints.minEpisode}`}</div>}
            </div>
            {searchResult
                .ready(data=>{
                    console.log(data);
                    return (
                        <div className="result-wrapper entry-transition">
                            <div className="result-grid">
                                {data.map(serie=>(
                                    <SerieCell key={serie.id} {...serie}/>
                                ))}
                            </div>
                        </div>
                    )
                }).notReady(()=><div className="loader"/>)
                .unwrap()
            }
        </div>
    )
}

export default SerieSearchPage;