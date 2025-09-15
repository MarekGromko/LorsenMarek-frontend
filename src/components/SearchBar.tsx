import { useRef } from "react";

interface SearchBarProps{
    placeholder?: string;
    onSearch?: (hint: string, isForce: boolean)=>any
}

const SearchBar = (props: SearchBarProps)=>{
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (isForce: boolean = false) => {
        if(props.onSearch && inputRef.current)
            props.onSearch(inputRef.current.value, isForce);
    }

    const eraseInput = ()=>{
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className="search-bar">
            <div className="input-bar">
                <div className="t-icon i-search xlarge"/>
                <form onSubmit={e=>(e.preventDefault(), handleSubmit())}>
                    <input ref={inputRef} type="text" placeholder="Search..."/>
                </form>
                <button onClick={e=>(e.preventDefault(), eraseInput())} className="t-button pad-4">
                    <div className="t-icon i-xmark xlarge"/>
                </button>
            </div>
            <button onClick={()=>handleSubmit(true)} className="t-button pad-4">
                <div className="t-icon i-arrow-refresh xlarge"/>
            </button>
        </div>
    )
}

export default SearchBar;