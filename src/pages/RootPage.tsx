import { NavLink, Outlet, useLocation } from "react-router";

const RootPage = () => {
    const location = useLocation();
    return (
        <div className="root-page">
            <nav>
                <div className="logo header-height">
                    <img src="/icons/logo.svg"/> 
                    <div>
                        <div className="title">Maintenance Logiciel Demo</div>
                        <div className="signature">Lorsen & Marek</div>
                    </div>
                </div>
                <h2>Features Person</h2>
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/person/search">Person Search</NavLink>
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={`/person/${(Math.random()*20) | 0}`}>Person CRUD</NavLink>
                <div className="divider"/>
                <h2>Features Series</h2>
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/serie/search">Serie Search</NavLink>
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={`/serie/${(Math.random()*20) | 0}`}>Serie CRUD</NavLink>
                <div className="divider"/>
                <h2>Features History</h2>
            </nav>
            <header className="header-height">
                <div className="header-content">
                    <div className="current">
                        currently on:
                        <div>{location.pathname}</div>
                    </div>
                    <div className="github">
                        <img src="/icons/github.svg"/>
                        <a href="https://github.com/MarekGromko/LorsenMarek-backend">Backend</a>
                        <a href="https://github.com/MarekGromko/LorsenMarek-frontend">Frontend</a>
                    </div>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default RootPage;