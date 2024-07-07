import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { useModal } from '../../hooks';

const style = {
  width: "100%",
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  // px: 4,
  // py: 6,
  postion: 'relative',
  overflowX: 'auto',
};

const BaseModal = ({children, onClose, open, disableBackdropClose, nonGlobal, ...props}) => {
  const {showModal} = useModal();

  return (
    <div>
      <Dialog
        open={nonGlobal ? open : showModal}
        onClose={(!disableBackdropClose && onClose )|| null}
        {...props}
        sx={{width:"100%"}}
      >
        <Box sx={style}>
          {children}
        </Box>
      </Dialog>
    </div>
  );
}

export default BaseModal;