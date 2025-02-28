import { Box, CircularProgress, InputAdornment, MenuItem, TextField } from "@mui/material";

import { Select } from "@mui/material";

import { InputLabel } from "@mui/material";

import { FormControl } from "@mui/material";

import { SelectChangeEvent,MenuProps } from "@mui/material";
import { useState } from "react";

import { useEffect } from "react";


export interface ISelectOption<T> {
    value: string;
    label: string;
    raw?:T;
}

export interface SelectWithSearchProps<T> {
    options: ISelectOption<T>[];
    label: string;
    value: string;
    required?: boolean;
    disabled?: boolean;
    onChange?: (value: ISelectOption<T>) => void;
    onSearch?: (value: string) => Promise<ISelectOption<T>[]>;
    isRemoteSearch?: boolean;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps2: Partial<MenuProps> = {
    autoFocus:false,
    
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
    //   width: 250,
    },
  },
};
export default function SelectWithSearch<T>({ options, label, value, required, disabled, onChange,onSearch }: SelectWithSearchProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<ISelectOption<T>[]>(options);
    const [selectedValue,setSelectedValue]=useState<string>(value || "");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSelectedValue(value || ""); // Đảm bảo không để `undefined`
    }, [value]);

    useEffect(() => {
        if (onSearch){
            setIsLoading(true);
            setFilteredOptions([]);
            onSearch(searchTerm).then((rs)=>{
                setIsLoading(false);
                setFilteredOptions(rs);
               
            });
        } else {
            
        
            const filtered = options.filter((option) =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOptions(filtered);
        }
    }, [searchTerm, options]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        // if (onSearch){
        //     onChange?.(event.target.value as any);
        //     return;
        // }
        // debugger;
        var found=filteredOptions.find((option)=>option.value===event.target.value);
        if (found){
            // debugger;
            setSelectedValue(found.value);
            onChange?.(found);
        }
    };

    return (
        <FormControl sx={{display:"flex",flex:1}}>
            {/* <InputLabel id="select-with-search-label">{label}</InputLabel> */}
            <Select
                // labelId="select-with-search-label"
                id="select-with-search"
                value={selectedValue}
                // loading={isLoading}
                // label={label}
                
                required={required}
                disabled={disabled}
                onChange={handleChange}
                onOpen={() => setSearchTerm('')}
                
                MenuProps={MenuProps2}
                
                // renderValue={(selected) => {
                //     const selectedOption = options.find((option) => option.value === selected);
                //     return selectedOption ? selectedOption.label : '';
                // }}
            >
                <Box sx={{ p: 1 }}>
                    <TextField
                        size="small"
                        autoFocus={true}
                        placeholder="Search..."
                        fullWidth
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key !== 'Escape') {
                                e.stopPropagation();
                            }
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isLoading && <CircularProgress size={20} />}
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </Box>
                {filteredOptions.map((option,index) => (
                    <MenuItem key={index} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
