import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddTraining(props) {

    const [training, setTraining] = useState({
        activity: '',
        date: dayjs(),
        duration: '',
        customer: props.customerId
    })

    // open = false, kun ikkuna on kiinni
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleSave = () => {
        console.log("AddTraining: save a new training");
        props.addTraining(training);
        setOpen(false);
    }

    const handleCancel = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleClickOpen}>Add Training</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Add Training
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter training details here:
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={(e) => setTraining({ ...training, activity: e.target.value })}
                        variant="standard">
                    </TextField>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={training.date}
                            onChange={(date) => setTraining({ ...training, date: date })}
                        />
                    </LocalizationProvider>

                    {/*<TextField
                        margin="dense"
                        label="Date"
                        value={training.date}
                        onChange={(e) => setTraining({ ...training, date: e.target.value })}
                        variant="standard">
    </TextField>*/}

                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={(e) => setTraining({ ...training, duration: e.target.value })}
                        variant="standard">
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Add new training</Button>
                    <Button onClick={handleCancel}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}