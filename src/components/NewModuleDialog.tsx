import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return {
      value: value,
      onChange: handleChange
  };
}

export default function NewModuleDialog({open, setOpen, submitCallback}: {open: boolean, setOpen: (open: boolean) => void, submitCallback: (id: string) => void}) {
    const idProps = useFormInput("");

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>New Module...</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the name of the module you want to create.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Module ID"
                    type="text"
                    fullWidth
                    variant="standard"
                    {...idProps}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {setOpen(false)}}>Cancel</Button>
                <Button onClick={() => {submitCallback(idProps.value)}}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}