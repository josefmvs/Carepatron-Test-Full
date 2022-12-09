import React from "react";
import { Modal, Box } from "@mui/material";

export interface IProps {
    open: boolean;
  }

const CPModal: React.FC<IProps> = ({open}) => {
  
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box>
               Modal Content here...
            </Box>
        </Modal>
    );
  };
  

  export default CPModal;