import { createBrowserRouter, redirect } from "react-router";
import PersonSearchPage from "./pages/PersonSearchPage";
import PersonDetailPage from "./pages/PersonDetailPage";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";

export default createBrowserRouter([
    {
        path: "/",
        Component: RootPage,
        ErrorBoundary: ErrorPage,
        children: [
            {
                index: true,
                loader: () => redirect("/person/search"),
                ErrorBoundary: ErrorPage
            },
            {
                path: "/person/search",
                Component: PersonSearchPage,
                ErrorBoundary: ErrorPage
            },
            {
                path: "/person/:id",
                Component: PersonDetailPage,
                ErrorBoundary: ErrorPage
            }
        ]
    }
])
