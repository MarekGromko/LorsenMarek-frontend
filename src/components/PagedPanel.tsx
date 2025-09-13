import { cnf } from "../utils/className";

interface PagedPanelProps extends React.PropsWithChildren{
    page: number;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    isWaiting?: boolean;
}

const PagedPanel = ({children, isWaiting, ...props}: PagedPanelProps) => {
    
    return (
        <div className="paged-panel">
            <div className="pagination">
                {!isWaiting && <>
                    {props.hasPrevPage && <button className="t-button">
                        <div className="t-icon i-caret-left xlarge"/>
                    </button>}
                    <div>page {props.page}</div>
                    {props.hasNextPage && <button className="t-button" >
                        <div className="t-icon i-caret-right xlarge"/>
                    </button>}
                </>}
            </div>
            <div className={cnf("page-content t-panel big", isWaiting && "is-waiting")}>
                {isWaiting ? <div className="loader"/> : children}
            </div>
        </div>
    )
}

export default PagedPanel;