import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { deleteSerie, updateSerie, useSerie } from "../api/serieApi";
import { Serie, serieCompare } from "../models/Serie";
import { cnf } from "../utils/className";
import Editable from "../components/Editable";


interface SerieDetailWrapperProps {
    remoteDetails: Serie;
    localDetails: Serie;
    setLocalDetails: React.Dispatch<React.SetStateAction<Serie>>,
    reloadRemote: ()=>void;
}

const SerieDetailWrapper = ({localDetails, setLocalDetails, remoteDetails, reloadRemote}: SerieDetailWrapperProps) => {
    const [isBusy, setBusy] = useState(false);

    const makeHandleEdit = (key: keyof Serie) => {
        let validate = (_: string)=>true;
        let parse    = (value: string)=>value as any;
        switch (key) {
            case 'note':
            case 'nb_episode': 
                validate = (value) => !isNaN(parseInt(value));
                parse = (value) => parseInt(value);
                break;
        }
        return (x: string) => (!isBusy && validate(x) && setLocalDetails({...localDetails, [key]: parse(x)}));
    }
    const handlePush = ()=>{
        updateSerie(localDetails).then(()=>(setBusy(false), reloadRemote()));
        setBusy(true);
    }
    const handleDelete = ()=>{
        deleteSerie(localDetails.id).then(()=>(setBusy(false), reloadRemote()));
        setBusy(true);
    }

    return (
        <div className="entry-transition">
            <div className="detail-grid">
                <div className="row">
                    <Editable 
                        onEdit={makeHandleEdit('title')}
                        className="title" 
                        label="Title"
                        value={localDetails.title}/>
                    <Editable 
                        onEdit={makeHandleEdit('genre')}
                        className="genre" 
                        label="Genre"
                        value={localDetails.genre}/>
                </div>
                <Editable 
                    onEdit={makeHandleEdit('nb_episode')}
                    className="gender" 
                    label={"Nb. Episode"} 
                    value={localDetails.nb_episode?.toString()}/>
                <Editable 
                    onEdit={makeHandleEdit('note')}
                    className="note" 
                    label={"Note"} 
                    value={localDetails.note?.toString()}/>
            </div>
            <div className="action-buttons">
                {isBusy ?<div className="loader" /> : <>
                    <button onClick={handleDelete} className="t-button danger pad-8">
                    Delete Person <div className="t-icon i-trash large"/>
                    </button>
                    <button onClick={handlePush} className={cnf("t-button accent pad-8", serieCompare(remoteDetails, localDetails) && 'disabled')}>
                        Upload changes<div className="t-icon i-cloud-arrow-up large"/> 
                    </button>
                </>}
            </div>
        </div>
    );
}


const SerieDetailPage = ()=>{
    const params = useParams();
    const id = parseInt(params.id!);
    //
    const [localDetails, setLocalDetails] = useState<Serie>({} as Serie);
    const [remoteDetails, reloadRemote] = useSerie(id);
    useEffect(()=>{
        if(remoteDetails.state === 'ready')
            setLocalDetails({...remoteDetails.getData()!});
    }, [remoteDetails])
    ///
    return (
        <div className="serie detail-page">
            <div className="id-field">
                <label>id</label>
                <div>@{params.id!.padStart(12, '0')}</div>
            </div>
            {remoteDetails
                .ready(remoteDetails=>(
                    <SerieDetailWrapper 
                        reloadRemote={reloadRemote} 
                        localDetails={localDetails} 
                        remoteDetails={remoteDetails} 
                        setLocalDetails={setLocalDetails}/>))
                .loading(()=><div className="loader"/>)
                .error(()=><div className="error-message entry-transition" >
                        <div>
                            <div className="t-icon i-alert-circle"/>
                            <div>404: Could not find this serie!</div>
                        </div>
                        <Link to="/serie/search">Go back</Link>
                </div>)
                .unwrap()}
        </div>
    )
}

export default SerieDetailPage;
