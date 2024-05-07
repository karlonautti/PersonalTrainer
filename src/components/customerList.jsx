import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/base";
import { Snackbar } from "@mui/material";

import AddCustomer from "./addCustomer";
import EditCustomer from "./editCustomer";
import AddTraining from "./addTraining";

export default function CustomerList() {

    // states
    const [customers, setCustomers] = useState([{ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' }]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const [colDefs, setColDefs] = useState([
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },

        { cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />, width: 120 },
        { cellRenderer: params => <AddTraining addTraining={addTraining} params={params} />, width: 140 },
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params)}
                >Delete
                </Button>
            , width: 120
        }
    ])

    useEffect(() => getCustomers(), []); //fetch only after the first rendering

    // Delete car
    const deleteCustomer = (params) => {
        // console.log(params.data);
        console.log(params.data._links.customer.href);
        if (window.confirm("Are you sure?")) {
            fetch(params.data._links.customer.href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Delete successful!");
                        getCustomers(); // haetaan päivittynyt asiakastilanne tietokannasta 
                    } else {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Delete failed!");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    //functions
    const getCustomers = () => {

        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', { method: 'GET' })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responsedata => {
                console.log(responsedata._embedded.customers);
                setCustomers(responsedata._embedded.customers);
            })
            .catch(error => console.error(error))
    }

    const addCustomer = (customer) => {
        console.log("Customerlist")
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                console.log("response " + response);
                if (response.ok) {
                    console.log("response is OK");
                    setOpenSnackbar(true)
                    setMsgSnackbar("Added a new customer successfully!");
                    return response.json();
                } else {
                    setMsgSnackbar("Adding a new customer failed");
                    throw new Error('Sending data to backend failed');
                }
            })
            .then(data => {
                console.log("parsed Json = " + data);
                getCustomers();
            })
    }

    const addTraining = (training) => {
        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                console.log("response " + response);
                if (response.ok) {
                    console.log("response is OK");
                    setOpenSnackbar(true)
                    setMsgSnackbar("Added a new training successfully!");
                    return response.json();
                } else {
                    setMsgSnackbar("Adding a new training failed");
                    throw new Error('Sending data to backend failed');
                }
            })
            .then(data => {
                console.log("parsed Json = " + data);
                getCustomers();
            })
            .catch(error => console.error(error));
    }

    const updateCustomer = (url, updateCustomer) => {
        console.log("Customerlist: updateCustomer")
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updateCustomer)
        })
            .then(response => {
                console.log("response " + response);
                if (response.ok) {
                    console.log("response is OK");
                    setOpenSnackbar(true)
                    setMsgSnackbar("Edited customer details successfully");
                    return response.json();
                } else {
                    setMsgSnackbar("Editing customer details failed");
                    throw new Error('Sending data to backend failed');
                }
            })
            .then(data => {
                console.log("parsed Json = " + data);
                getCustomers();
            })
    }

    // return
    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ width: 1500, height: 600 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={10}
                    paginationPageSizeSelector={[10, 25, 50]}
                />
                <Snackbar
                    open={openSnackbar}
                    message={msgSnackbar}
                    autoHideDuration={3000}
                    onClose={() => {
                        setOpenSnackbar(false);
                        setMsgSnackbar("")
                    }}
                >
                </Snackbar>
            </div>

        </>
    )

}