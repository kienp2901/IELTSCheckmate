import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AlertColor, Backdrop, CircularProgress } from '@mui/material';
import { useSnackbar } from "notistack";
interface IAlert {
    show: (msg: string, severity: AlertColor, duration?: number) => void;
    info: (msg: string, duration?: number) => void;
    success: (msg: string, duration?: number) => void;
    error: (msg: string, duration?: number) => void;
    warning: (msg: string, duration?: number) => void;
    showWait: () => void;
    hideWait: () => void;
    showApiMessage: (res:any) => boolean;
}

const AlertContext = createContext<IAlert | null>(null);


export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [wait, setWait] = useState(false);


    const show = (msg: string, severity: AlertColor = "info", duration: number = 5000) => {
        severity = severity || "info";
        if (typeof msg !== "string") {
            msg = JSON.stringify(msg);
        }
        // console.log(msg);
        // debugger;
        enqueueSnackbar(msg, {
            variant: severity,
            autoHideDuration: duration || 5000

        });
    }
    const info = (msg: string, duration?: number) => {
        show(msg, "info", duration);
    }
    const success = (msg: string, duration?: number) => {
        show(msg, "success", duration);
    }
    const error = (msg: string, duration?: number) => {
        show(msg, "error", duration);
    }
    const warning = (msg: string, duration?: number) => {
        show(msg, "warning", duration);
    }
    const showWait = () => {
        setWait(true);
    }
    const hideWait = () => {
        setWait(false);
    }
    const showApiMessage = (res:any):boolean=>{
        // debugger;
        if ((res.status == 200)||(res.status == 201)||(res.code == 200)||(res.code == 201)){
            success(res.message);
            return true;
        }else{
            var err=res.errors;
            if (err) {
                err=`\n${err}`
            }
            error(res.message+err);
            return false;
        }
    }



    return (
        <AlertContext.Provider value={{ show, info, success, error, warning, showWait, hideWait,showApiMessage }}>
           
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: 999999 })}
                open={wait}

            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </AlertContext.Provider>
    );
};


export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within a AlertProvider');
    }
    return context;
};