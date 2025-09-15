import { useParams } from "react-router";
import Editable from "../components/Editable";
import { deletePerson, updatePerson, usePerson } from "../api/personApi";
import { useEffect, useState } from "react";
import { Person, personCompare } from "../models/Person";
import { cnf } from "../utils/className";

interface PersonDetailWrapperProps {
    remoteDetails: Person;
    localDetails: Person;
    setLocalDetails: React.Dispatch<React.SetStateAction<Person>>,
    reloadRemote: ()=>void;
}

const PersonDetailWrapper = ({localDetails, setLocalDetails, remoteDetails, reloadRemote}: PersonDetailWrapperProps) => {
    const [isBusy, setBusy] = useState(false);

    const makeHandleEdit = (key: keyof Person) => {
        return (newValue: string) => !isBusy && setLocalDetails({...localDetails, [key]: newValue});
    }

    const handlePush = ()=>{
        updatePerson(localDetails).then(()=>(setBusy(false), reloadRemote()));
        setBusy(true);
    }

    const handleDelete = ()=>{
        deletePerson(localDetails.id).then(()=>(setBusy(false), reloadRemote()));
        setBusy(true);
    }

    return (
        <div className="t-panel big entry-transition">
            <div className="detail-grid">
                <div className="name-row">
                    <Editable 
                        onEdit={makeHandleEdit('firstName')}
                        className="first-name" 
                        label={"first name"} 
                        value={localDetails.firstName}/>
                    <Editable 
                        onEdit={makeHandleEdit('lastName')}
                        className="last-name" 
                        label={"last name"} 
                        value={localDetails!.lastName}/>
                </div>
                <Editable 
                    onEdit={makeHandleEdit('gender')}
                    className="gender" 
                    label={"gender"} 
                    value={localDetails.gender}/>
                <Editable 
                    onEdit={makeHandleEdit('email')}
                    className="email" 
                    label={"email"} 
                    value={localDetails.email}/>
            </div>
            <div className="action-buttons">
                {isBusy ?<div className="loader" /> : <>
                    <button onClick={handleDelete} className="t-button danger pad-8">
                    Delete Person <div className="t-icon i-trash large"/>
                    </button>
                    <button onClick={handlePush} className={cnf("t-button accent pad-8", personCompare(remoteDetails, localDetails) && 'disabled')}>
                        Upload changes<div className="t-icon i-cloud-arrow-up large"/> 
                    </button>
                </>}
            </div>
        </div>
    )
}

const PersonDetailPage = ()=>{
    const params = useParams();
    if(!Number(params.id)) throw "error";
    const id = parseInt(params.id!);
    ///
    const [localDetails, setLocalDetails] = useState<Person>({} as Person);
    const [remoteDetails, reloadRemote] = usePerson(id);
    useEffect(()=>{
        if(remoteDetails.state === 'ready')
            setLocalDetails({...remoteDetails.getData()!})
    }, [remoteDetails]);
    ///

    ///
    return (
        <div className="person-detail-page">
            <div className="id-field">
                <label>id</label>
                <div>@{params.id!.padStart(12, '0')}</div>
            </div>
            {remoteDetails
                .ready((remoteDetails)=><PersonDetailWrapper reloadRemote={reloadRemote} localDetails={localDetails} remoteDetails={remoteDetails} setLocalDetails={setLocalDetails}/>)
                .notReady(()=><div className="loader"/>)
                .unwrap()
            }
        </div>
    )
}

export default PersonDetailPage;