import { useRef, useState } from "react";
import { cnf } from "../utils/className";

interface DropDownProps<T extends object> {
    options: T,
    value: keyof T,
    onSelect: (key: keyof T) => any
}

function DrowDown<T extends Record<string, string>>({value, options, onSelect}: DropDownProps<T>){
    const rootRef = useRef<HTMLDivElement>(null);
    const [isFocus, setFocus] = useState(false);

    const handleChange = (key: keyof T)=>{
        rootRef.current?.blur();
        onSelect(key);
    }

    return (
        <div 
            ref={rootRef}
            onFocus={()=>setFocus(true)} 
            onBlur={()=>setFocus(false)}
            tabIndex={0} 
            className="drop-down">
                {options[value]}
                {isFocus && (
                    <div className="options-drop entry-transition">
                        {Object.entries(options).map(([key, label])=>(
                            <div 
                                key={key} 
                                onClick={()=>handleChange(key)}
                                className={cnf(key == value && "current")}
                            >
                                {label as any}
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )

}

export default DrowDown;