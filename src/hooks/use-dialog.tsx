import { ReactNode, useState, useCallback } from "react";
import { ConfirmDialogButtonType } from "../components/ConfirmDialog";
export interface IButtonConfirm {
  buttonType: ConfirmDialogButtonType;
  color?: string;
  onClick?: () => void;
  text?: string;
}
interface IShowDialog {
  title?: ReactNode;
  content?: ReactNode;
  buttons?: Array<IButtonConfirm>;
  onClose?: () => void;
}
export interface IConfirmDialogReturn {
  isOpen: boolean;
  title: ReactNode;
  content: ReactNode;
  buttons: Array<IButtonConfirm>;
  setIsOpen: (value: boolean) => void;
  onClose: () => void;
  hide: () => void;
  show: (options: IShowDialog) => void;
}
export const useDialog = (): IConfirmDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<ReactNode>(null);
  const [content, setContent] = useState<ReactNode>(null);
  const [buttons, setButtons] = useState<Array<IButtonConfirm>>([]);
  const [onCloseDialog, setOnCloseDialog] = useState<() => void>(() => { });
  const show = useCallback(({ title, content, buttons, onClose:onCloseCallback }: IShowDialog) => {
    setIsOpen(true);
    setTitle(title || 'Confirm');
    setContent(content || 'Are you sure?');
    setButtons(buttons || [{
      buttonType: ConfirmDialogButtonType.CLOSE, onClick: () => {
        setIsOpen(false);
      }
    }]);
    setOnCloseDialog(onCloseCallback || (() => { }));
    // console.log(buttons);
  }, []);

  const hide = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onClose = useCallback(() => {
    setIsOpen(false);
    if (onCloseDialog) {
      onCloseDialog();
    }
  }, []);
  // const show = useCallback((value: boolean) => {
  //   setIsOpen(value);
  // },[]);
  return {
    isOpen,
    title,
    content,
    setIsOpen,
    onClose,
    buttons,
    show,
    hide
  };
};
