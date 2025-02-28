'use client'

import { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material'
import { IConfirmDialogReturn, useDialog } from '../hooks/use-dialog';
export enum ConfirmDialogButtonType {
    CANCEL = 0,
    OK = 1,
    YES = 2,
    NO = 3,
    CLOSE = 4,
}
export const ConfirmDialogButtonText = {
    [ConfirmDialogButtonType.CANCEL]: 'Cancel',
    [ConfirmDialogButtonType.OK]: 'OK',
    [ConfirmDialogButtonType.YES]: 'Yes',
    [ConfirmDialogButtonType.NO]: 'No',
    [ConfirmDialogButtonType.CLOSE]: 'Close',
}

const ConfirmDialogButtonColor = {
    [ConfirmDialogButtonType.CANCEL]: 'error',
    [ConfirmDialogButtonType.OK]: 'primary',
    [ConfirmDialogButtonType.YES]: 'success',
    [ConfirmDialogButtonType.NO]: 'error',
    [ConfirmDialogButtonType.CLOSE]: 'error',
}

export default function ConfirmDialog(cf:IConfirmDialogReturn) {
    const { isOpen, setIsOpen,buttons,title,content,onClose } = cf;
   
    const onBtnClickHandler = (btnType: ConfirmDialogButtonType) => {
        setIsOpen(false);
        buttons.find((button) => button.buttonType === btnType)?.onClick?.();
    }

    return (<Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ borderBottom: 1, borderColor: 'divider' }}>
                {title}
            </DialogTitle>
            <DialogContent sx={{ mt: 2,mb:2 }}>
                

                    
                        {content}
                    
                
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                {buttons.map((button, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        onClick={() => onBtnClickHandler(button.buttonType)}
                        color={button.color as any || ConfirmDialogButtonColor[button.buttonType]}
                    >
                        {button.text || ConfirmDialogButtonText[button.buttonType]}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    );
    // );

    // createPortal(dialogContent, document.body);
    // return {
    //     show: (title: string, content: string,
    //         buttons: Array<ConfirmDialogButtonType | ReactNode>,
    //         onBtnClick: (index: number) => void) => {
    //         return new Promise((resolve, reject) => {
    //             setTitle(title);
    //             setContent(content);
    //             setButtons(buttons);

    //             setOnBtnClick((idx: number) => { onBtnClick(idx); resolve(idx); });
    //             setOpen(true);
    //         })

    //     },
    //     hide: () => setOpen(false),

    // }
}

