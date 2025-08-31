import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useAlert } from '../../context';
import React from 'react';


export const Alert = ()  => {
  const {alert, setAlert} = useAlert()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setAlert({open: false});
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(String(alert.message)); }
    catch(e){ /* ignore */ }
  };

  // keep errors persistent until user closes them
  const autoHide = alert.type === 'error' ? null : 2500;

  return (
      <Snackbar open={alert.open} autoHideDuration={autoHide} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleClose} severity={alert.type} elevation={10} variant="filled" sx={{ minWidth: 360 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{alert.type === 'error' ? 'Error' : alert.type === 'success' ? 'Success' : 'Info'}</Typography>
            <IconButton size="small" onClick={handleCopy} aria-label="copy message" sx={{ color: 'inherit' }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box mt={1}>
            {typeof alert.message === 'string' && alert.message.length > 120 ? (
              <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 12, mt: 1 }}>{alert.message}</Typography>
            ) : (
              <Typography variant="body2" sx={{ mt: 1 }}>{alert.message}</Typography>
            )}
          </Box>
        </MuiAlert>
      </Snackbar>
  );
}
