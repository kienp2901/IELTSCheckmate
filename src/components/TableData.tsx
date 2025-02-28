import React, {  useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridFilterModel, GridLogicOperator, GridSortModel, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, CircularProgress, TextField } from '@mui/material';
import SplitButton from './SplitButton';
import './grid.scss';
export const nonFilterQuickFn=()=>{
    return (value:any)=>{
        return false;
    }
}
export interface DttTableDataProps {
    noRowsLabel?: string;
    buttonOptions: Array<{ label: string; disabled?: boolean; style?: React.CSSProperties }>;
    columns: GridColDef[];
    hideSearchBox?: boolean;
    rows: any[];
    loading: boolean;
    sortModel?: GridSortModel;
    checkboxSelection?: boolean;
    disableRowSelectionOnClick?: boolean;
    
    // onRowSelectionModelChange?: (model: GridRowSelectionModel) => void;
    onMenuClick: (index: number) => void;
    onSortModelChange?: (model: GridSortModel) => void;
    [key:string]:any;
}

const DttTableData: React.FC<DttTableDataProps> = ({ 
    noRowsLabel, buttonOptions, columns, rows, loading, onMenuClick, sortModel, 
    hideSearchBox=false,
    onSortModelChange,checkboxSelection,disableRowSelectionOnClick,...props }) => {
    const [gridSortModel, setGridSortModel] = useState<GridSortModel>(sortModel??[]);
    const [gridWidth,setGridWidth]=useState("100px")
    const [gridFilterModel, setGridFilterModel] = useState<GridFilterModel>({
        quickFilterValues: [],
        quickFilterLogicOperator: GridLogicOperator.Or,
        items: []
    });

    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>(props.rowSelectionModel||[]);

    // useEffect(() => {
    //     if (sortModel) {
    //         setGridSortModel(sortModel);
    //     }
    // }, [sortModel]);
    // useEffect(() => {
    //     if (initialRowSelectionModel) {
    //         // console.log(initialRowSelectionModel,"init change");
    //         setSelectedRows(initialRowSelectionModel);
    //     }
    // }, [initialRowSelectionModel]);
    const handleSortModelChange = (model: GridSortModel) => {
        setGridSortModel(model);
        if (onSortModelChange) {
            onSortModelChange(model);
        }
    }
    const handleFilterModelChange = (model: GridFilterModel) => {
        setGridFilterModel(model);
    }

    const search = (e: any) => {
        // build filter model

        var ft: GridFilterModel = {
            quickFilterValues: [],
            quickFilterLogicOperator: GridLogicOperator.Or,
            items: []
        };

        ft.quickFilterValues = [e.target.value];
        setGridFilterModel(ft);

    }

    return (
        <>
        <Box sx={{display: 'flex',flexDirection: 'column',flex: 1}}>
           {!hideSearchBox && <Box sx={{ mb: 2 }} display="flex" justifyContent="flex-end">
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 200 }}
                        onChange={search}
                    />
                <Box sx={{display:"flex",flex:1}}/>
                <SplitButton
                    options={buttonOptions.map((btn) => ({
                    ...btn,
                    }))}
                    buttonCount={1}
                    onClick={onMenuClick}
                />
            </Box>}
            <Box sx={{
                flex:1,
                overflow:"hidden",
                width:"100%",
                display:"flex",
                flexDirection:"column",
              
            }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                localeText={{
                    noRowsLabel: noRowsLabel ?? 'No records available',
                }}
                {...props}
                checkboxSelection={checkboxSelection}    
                disableRowSelectionOnClick={disableRowSelectionOnClick}
                rowSelectionModel={selectedRows}
                // onRowSelectionModelChange={onRowSelectionModelChange}
                sortModel={gridSortModel}
                onSortModelChange={handleSortModelChange}
                filterModel={gridFilterModel}
                onFilterModelChange={handleFilterModelChange}
                pageSizeOptions={[10, 25, 50, 100]}
                loading={loading}
                sx={{
                    display: 'flex',
                    flex: 1,
                //    width:"100px",
                    overflow:"hidden",
                    '.MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                    },
                    '& .highlight-cell': {
                        ':hover':{
                            backgroundColor: '#f9c74f'
                        },
                        backgroundColor: '#f9c74f'
                    }
                }}
                {...props}
              
                // disableRowSelectionOnClick
                // disableColumnSelector
                // showCellVerticalBorder
                
                autoHeight
                paginationModel={props.paginationModel}  // Sử dụng paginationModel
                onPaginationModelChange={(model) => props.setPaginationModel?.(model)}  // Cập nhật paginationModel khi thay đổi trang
                getRowClassName={(params: any) => {
                    // return  Number(params.row) == Number(props.selectedRow) ? 'highlight-cell' : ''
                   return  params.row.highlight == 1 ? 'highlight-cell' : ''
                }}
            />
            </Box>
            </Box>
            
        </>
    );
};

export default DttTableData;