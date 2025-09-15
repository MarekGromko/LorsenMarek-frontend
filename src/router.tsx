import { createBrowserRouter } from "react-router";
import PersonSearchPage from "./pages/PersonSearchPage";
import PersonDetailPage from "./pages/PersonDetailPage";

export default createBrowserRouter([
    {
        path: "/",
        Component: PersonSearchPage
    },
    {
        path: "/person/:id",
        Component: PersonDetailPage
    }
])
