export default class ApiResult<T>{
    public readonly state: 'loading' | 'ready' | 'error'
    private dataDatail?: T;
    private errorDetail?: Error;

    private cb_ready?: (data: T)=>any;
    private cb_error?: (error: Error)=>any;
    private cb_loading?: ()=>any;
    private cb_notReady?: ()=>any;
    constructor(state: ApiResult<T>['state'], data?: T, error?: Error) {
        this.state = state;
        this.dataDatail  = data;
        this.errorDetail = error;
    }
    ready(callback: (data: T)=>any) {
        this.cb_ready = callback;
        return this;
    }
    error(callback: (error: Error)=>any) {
        this.cb_error = callback;
        return this;
    }
    loading(callback: ()=>any) {
        this.cb_loading = callback;
        return this;
    }
    notReady(callback: ()=>any) {
        this.cb_notReady = callback;
        return this;
    }
    unwrap(): any {
        switch(this.state) {
            case 'error': 
                if(this.cb_error) 
                    return this.cb_error(this.errorDetail as any);
                else if(this.cb_notReady)
                    return this.cb_notReady();
                break;
            case 'loading': 
                if(this.cb_loading) 
                    return this.cb_loading();
                else if(this.cb_notReady)
                    return this.cb_notReady();
                break;
            case 'ready':
                if(this.cb_ready) return this.cb_ready(this.dataDatail as any);
        }
        return null;
    }


} 