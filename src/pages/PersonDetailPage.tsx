import { useParams } from "react-router";
import Editable from "../components/Editable";

const PersonDetailPage = ()=>{
    const params = useParams();
    return (
        <div className="person-detail-page">
            <div className="id-field">
                <label>id</label>
                <div>@{params.id!.padStart(12, '0')}</div>
            </div>
            <div className="t-panel big">
                <div className="detail-grid">
                    <div className="name-row">
                        <Editable className="first-name" label={"first name"} value={"Jane"}/>
                        <Editable className="last-name" label={"last name"} value={"Doe"}/>
                    </div>
                    <Editable className="gender" label={"gender"} value={"male"}/>
                    <Editable className="email" label={"email"} value={"abcdef@cocktail.com"}/>
                </div>
                <div className="action-buttons">
                    <button className="t-button danger pad-8">
                        Delete Person <div className="t-icon i-trash large"/> 
                    </button>
                    <button className="t-button accent pad-8">
                        Upload changes<div className="t-icon i-cloud-arrow-up large"/> 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PersonDetailPage;