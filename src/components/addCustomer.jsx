import { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })

    // open = false, kun ikkuna on kiinni
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleSave = () => {
        console.log("AddCustomer: save a new customer");
        props.addCustomer(customer);
        setOpen(false);
    }

    const handleCancel = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleClickOpen}>Add New Customer</Button>

            <Dialog open={open}>
                <DialogTitle>
                    Add Customer
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter customer details here:
                    </DialogContentText>
                    <TextField
                        margin= "dense"
                        label= "First name"
                        value= {customer.firstname}
                        onChange={(e) => setCustomer({ ...customer, firstname: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Last name"
                        value= {customer.lastname}
                        onChange={(e) => setCustomer({ ...customer, lastname: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Streetaddress"
                        value= {customer.streetaddress}
                        onChange={(e) => setCustomer({ ...customer, streetaddress: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Postcode"
                        value= {customer.postcode}
                        onChange={(e) => setCustomer({ ...customer, postcode: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "City"
                        value= {customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Email"
                        value= {customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        variant= "standard">
                    </TextField>

                    <TextField
                        margin= "dense"
                        label= "Phone"
                        value= {customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        variant= "standard">
                    </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Add new customer</Button>
                    <Button onClick={handleCancel}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div>
    )
}