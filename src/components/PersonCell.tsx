import { Link } from "react-router";

interface PersonCellProps{
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;

}

const PersonCell = (props: PersonCellProps) => {
    return (
        <div className="person-cell t-ibox small">
            <div className="row id-gender">
                <div className="id">
                    <label>ID</label>
                    <Link to={"/person/" + props.id}>@{props.id}</Link>
                </div>
                <div className="gender">{props.gender}</div>
            </div>
            <div className="row name">{props.firstName + " " + props.lastName}</div>
            <div className="row email">{props.email}</div>
        </div>
    )
}

export default PersonCell;