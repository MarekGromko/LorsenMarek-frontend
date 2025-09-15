import { useLayoutEffect, useRef, useState } from "react";
import { cnf } from "../utils/className";

interface EditableProps {
    value: string,
    onEdit?: (value: string, oldValue: string)=>any
    label?: string,
    className?: string
}

const Editable = (opts: EditableProps)=>{
    const inputRef = useRef<HTMLInputElement>(null);
    const [isEditing, setEditing] = useState(false);

    const handleStartEdit = ()=>{
        setEditing(true);
    }
    const handleCancelEdit = ()=>{
        setEditing(false);
    }
    const handleEditSubmit = ()=>{
        if(!inputRef.current) {
            setEditing(false);
            return;
        }
        const value = inputRef.current.value;
        if(opts.onEdit)
            opts.onEdit(value, opts.value);
        setEditing(false);
    }

    useLayoutEffect(()=>{
        if(inputRef.current)
            inputRef.current.focus();
    });

    return (
        <div className={cnf("editable", opts.className)}>
            {opts.label && <label>{opts.label}</label>}
            <div className="value">
                {isEditing ? <>
                    <form onSubmit={e=>(e.preventDefault(), handleEditSubmit())}>
                        <input ref={inputRef} defaultValue={opts.value}/>
                    </form>
                    <button className="t-button" onClick={handleCancelEdit}>
                        <div className="t-icon i-xmark"/>
                    </button>
                </> : <>
                    {opts.value}
                    <button className="t-button" onClick={handleStartEdit}>
                        <div className="t-icon i-pencil"/>
                    </button>   
                </>}
            </div>
        </div>
    )
}

export default Editable;