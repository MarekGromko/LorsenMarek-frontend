import { Link } from "react-router";

interface SerieCellProps{
    id: number;
    title: string;
    genre: string;
    note: number;
    nb_episode: number;
}

const SerieCell = (serie: SerieCellProps) => {
    return (
        <div className="serie-cell t-ibox small">
            <div className="row id-note">
                <div className="id">
                    <label>ID</label>
                    <Link to={"/serie/" + serie.id}>@{serie.id.toString().padStart(12, '0')}</Link>
                </div>
                <div className="note">{serie.note} Stars</div>
            </div>
            <div className="row title">{serie.title}</div>
            <div className="row genre-nb-episode">
                <div className="genre">{serie.genre}</div>
                <div className="nb-episode">{serie.nb_episode} episodes</div>
            </div>
        </div>
    )
}

export default SerieCell;