
interface PagedPanelProps extends React.PropsWithChildren{
    columns?: number
    page: number,
    prev?: boolean,
    next?: boolean,
    onPageRequest: (new_page: number, current_page: number) => any
}

const PagedPanel = ({children, columns}: PagedPanelProps) => {
    let wrapper_style: React.CSSProperties = {
        gridTemplateColumns: "1fr ".repeat(Math.max(Number.isInteger(columns) ? (columns as any) : 0, 1)).trim(),
    }
    return (
        <div style={wrapper_style} className="paged-panel">
            <div className="pagination">
                
            </div>
            <div className="t-panel big content">
                {children}
            </div>
        </div>
    )
}

export default PagedPanel;