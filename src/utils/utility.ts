// builder maker
type isEquals<X, Y> = 
    (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
        ? true
        : false;
type BuilderFields<T = {}, Fields = never> = {
    [Key in keyof T]: (value: T[Key])=>BuilderFields<T, Fields | Key>;
} & {
    build(): isEquals<Fields, keyof T> extends true ? T : Partial<T>;
};
export const makeBuilder = <const T>(keys: (keyof T)[]) => {
    return ()=>{
        let values = {} as Record<any, any>;
        let builder = {} as any;
        for(var key of keys) {
            builder[key] = function(this: any, value: any){
                values[key] = value;
                return this;
            }.bind(builder);
        };
        builder.build = ()=>({...values});
        return builder as BuilderFields<T>;
    }
}

// compare make
export const makeCompare = <const T>(keys: (keyof T)[]) => {
    return (a: any, b: any)=>(
        typeof a === 'object' && 
        typeof b === 'object' &&
        keys.findIndex(key=>a[key] != b[key]) == -1
    );
}