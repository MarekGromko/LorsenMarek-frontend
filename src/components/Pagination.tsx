type PaginationProps  = {
    onPageChange?: (page: number, currentPage: number) => any,
    page: number;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    disabled?: boolean;
};

const Pagination = ({page, ...props}: PaginationProps) => {
    const makePageHandler = (pageReq: number) => {
        return ()=>{
            if(props.onPageChange)
                props.onPageChange(pageReq, page || 0);
        }
    }
    return (
        <div className="pagination">
            {typeof page === 'number'  && <>
                {props.hasPrevPage && <button className="t-button" onClick={makePageHandler(page-1)}>
                    <div className="t-icon i-caret-left xlarge"/>
                </button>}
                <div>page {page}</div>
                {props.hasNextPage && <button className="t-button" onClick={makePageHandler(page+1)}>
                    <div className="t-icon i-caret-right xlarge"/>
                </button>}
            </>}
        </div>
    )
}

export default Pagination;