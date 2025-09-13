export function cnf(...classNames: any[]): string {
    const names = new Set();
    for(let name of classNames) {
        if(typeof name === 'function') name = name();
        if(!name) continue;
        names.add(name);
    }
    return [...names.values()].join(' ');
}