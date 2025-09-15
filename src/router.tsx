import { createBrowserRouter } from "react-router";
import PersonSearchPage from "./pages/PersonSearchPage";

export default createBrowserRouter([
    {
        path: "/",
        Component: PersonSearchPage
    }
])
