import { Link, useRouteError } from "react-router"

const ErrorPage = ()=>{
    const error = useRouteError() as any;
    console.error(error);
    return (
        <div className="error-page">
            <div className="error-message entry-transition" >
                <div>
                    <div className="t-icon i-alert-circle"/>
                    <div>Something wrong happend!</div>
                </div>
                <div>{error.error.statusText || error.message}</div>
                <Link to="/">Go back</Link>
            </div>
        </div>
    )
}

export default ErrorPage;