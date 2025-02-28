import { Box, styled } from "@mui/material";

import { TextField, Typography } from "@mui/material";
import SelectWithSearch from "./SelectWithSearch";
import TextEditor from "./TextEditor";
import { useEffect, useRef } from "react";

export enum EditType {
  LABEL = 0,
  TEXT = 1,
  SELECT = 2,
  NUMBER = 3,
  EDITOR = 4,
  IMAGE = 5,
}
export interface IListToggleEdit {
  value: string | number;
  label: string;
}
interface IDataEditToggle {
  value: string | number;
  list?: IListToggleEdit[];
  type: EditType;
  // only used for image
  image?:File;
  storageUrl?:string;
}
export interface EditToggleProps {

  label: string;
  isEdit: boolean;
  data: IDataEditToggle;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
  errorText?: string;
  /* validation input text, return undefined if valid, return error message if invalid */
  
  sx?:any;
  // selected: string;
}

const ImageUploadInput = styled('input')({
  display: 'none',
})

const ImageUploadLabel = styled('label')(({ theme }) => ({
  display: 'inline-block',
  padding: theme.spacing(1, 2),
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': {
      backgroundColor: theme.palette.grey[100],
  },
}))
const HtmlDisplay=({value:html}:{value:string})=>{
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(ref.current && html){
      // html=html.replace(/(<img[^>]*)\\"/g,"$1'");
      var found=true;
      var updatedHtml =html;
      
      while(found){
        found=false;
        updatedHtml = updatedHtml.replaceAll(/<img\b([^>]*?)\b(\w+)=\\"(.*?)\\"/gm, (match, attributes, key, value) => {
          // debugger;
          // console.log("match:",match,attributes,key,value);
          found=true;
          return `<img${attributes} ${key}='${value}'`;
        });
      }
      console.log("updatedHtml:",updatedHtml);
      ref.current.innerHTML=updatedHtml;
    }
  },[html]);
  return  <Typography variant="body1" component="span" >
              <div ref={ref}></div>
  </Typography>
}

export const EditToggle = ({
  label,
  isEdit,
  data,
  required,
  disabled,
  onChange,
  errorText,
  ...props
  
}: EditToggleProps) => {
  const renderEdit = () => {
    const getValueDisplay = (value: string | number) => {
      if (data.type === EditType.SELECT) {
        const selectedOption = (data?.list || []).find((item) => `${item.value}` == `${data.value}`);
        var rs=typeof(selectedOption)!=undefined ? (selectedOption?.label||"") : "";
        // console.log("rs",rs,selectedOption,data,value);
        return rs;
      }
     
      return `${value}`;
    }
    const getImageBlobUrl=()=>{
      // console.log("get blob url",data);
      if(data.image){
        return URL.createObjectURL(data.image);
      } 
      if (data.value) {
        return `${data.storageUrl}${data.value}`;
      }
      return undefined;
    }
    if (isEdit) {
      switch (data.type) {
        case EditType.LABEL:
          return (
            <Typography variant="body1" component="span">
              {getValueDisplay(data.value)}
            </Typography>
          );
        case EditType.TEXT:
          return (
            <TextField
              value={data?.value}
              
              required={required}
              disabled={disabled}
              onChange={(e) => {
                onChange?.(e.target.value);
              }}
              error={!!errorText} // Hiển thị viền đỏ nếu có lỗi
              helperText={errorText} // Hiển thị lỗi bên dưới
              fullWidth={true}
             
            />
          );
        case EditType.SELECT:
          return (
            <SelectWithSearch
              options={(data?.list || []).map((item) => ({
                value: `${item.value}`,
                label: item.label,
              }))}
              
              
              label={label}
              value={`${data.value}`}
              onChange={(item) => {
                // console.log("item",item);
                onChange?.(item.value);
              }}

            />
          );
        case EditType.EDITOR:
          var nv=`${data?.value}` || "";
          nv=nv.replace(/\\"/g,"'");
          return (
            <TextEditor
              content={nv}
              onChange={(value) => {
                onChange?.(value);
              }}
            />
          );
        case EditType.IMAGE:
          // console.log("data image",data);
          var blob=getImageBlobUrl();
          return (<>
            {blob && (
                    <Typography variant="body1"  className="Mui-img" component="img" src={blob} />
                )}
          <ImageUploadLabel>
                    <ImageUploadInput
                        type="file"
                        accept="image/*"
                        onChange={(value) => {
                          onChange?.(value as any);
                        }}
                        required={required}


                    />
                    Choose File
                </ImageUploadLabel>
                <Typography variant="body2" sx={{ ml: 1, display: 'inline-block' }}>
                    {data.image ? data.image.name : data?.value}
                </Typography>
                </>
          );

      }
    } else {
      if (data?.type === EditType.EDITOR) {
        var avalue=getValueDisplay(data.value);
        // debugger;
        console.log("a value:",avalue);

        return (
            <HtmlDisplay value={avalue} />
        );
      }
      if (data?.type === EditType.IMAGE) {
        var blob=getImageBlobUrl();
        return (<>{blob && <Typography variant="body1"  className="Mui-img" component="img" src={blob} /> }</>);
      }
      return (
        <Typography variant="body1" component="span">
          {getValueDisplay(data.value)}
        </Typography>
      );
    }



  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 ,...props.sx||{}}}>
      {/* {<AIcon sx={{ mr: 2, color: "primary.main" }} />} */}

      <Box sx={{ flex: 1, display: "block" }}>
        <Typography
          sx={{ mb: 1 }}
          variant="body1"
          color="textSecondary"
        >
          {label}: {isEdit && required && (
            <span style={{ color: "red", fontWeight: "bold" }}>*</span> // Đặt dấu * thành màu đỏ
          )}{' '}
        </Typography>
        {renderEdit()}
      </Box>
    </Box>
  );
};