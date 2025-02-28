import { GridColDef } from "@mui/x-data-grid";
import DttTableData, { DttTableDataProps } from "./TableData";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import PagerTitle from "./PagerTitle";

interface IListingTableTemplateProps extends DttTableDataProps {
    pageTitle: string;
    [key: string]: any;
}
const ListingTableTemplate = ({ noRowsLabel, buttonOptions, pageTitle, columns, rows, loading, onMenuClick,sortModel,...props }: IListingTableTemplateProps) => {
    return (<>
        {/* <Paper sx={{ p: 2, mb: 2 }}> */}
            <PagerTitle title={pageTitle} />
            <DttTableData noRowsLabel={noRowsLabel} buttonOptions={buttonOptions} columns={columns} rows={rows} loading={loading} {...props} onMenuClick={onMenuClick} sortModel={sortModel} />

        {/* </Paper> */}
    </>)

}

export default ListingTableTemplate;
