
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CPDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    border: 0
  }
}));

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function CPDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export interface IProps {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: React.ReactNode;
    content?: React.ReactNode;
}

const CPModal: React.FC<IProps> = (props) => {

  const {handleClose, open, title, content} = props; 
  return (
    <div>
      <CPDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <CPDialogTitle onClose={handleClose}>
         {title}
        </CPDialogTitle>
        <DialogContent dividers>
          {content}
        </DialogContent>
      </CPDialog>
    </div>
  );
}

export default CPModal;