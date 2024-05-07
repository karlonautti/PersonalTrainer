import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/base";
import { Snackbar } from "@mui/material";
import dayjs from "dayjs";

// import AddTraining from "./addTraining";

export default function TrainingList() {

    // states
    const [trainings, setTrainings] = useState([{ id: '', activity: '', date: '', duration: '', customer: '' }]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msgSnackbar, setMsgSnackbar] = useState('');

    const [colDefs, setColDefs] = useState([
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Date', field: 'date', sortable: true, filter: true,
            cellRenderer: (params) => (
                dayjs(params.value).format('DD.MM.YYYY HH:mm')
            )
        },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true },
        {
            headerName: 'Customer',
            cellRenderer: (params) => {
                const { firstname, lastname } = params.data.customer;
                return `${firstname} ${lastname}`;
            },
            sortable: true,
            filter: true
        },
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params)}
                >Delete Training
                </Button>
            , width: 130
        }
    ])

    useEffect(() => getTrainings(), []); //fetch only after the first rendering

    //functions
    const getTrainings = () => {

        fetch('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings', { method: 'GET' })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(responsedata => {
                console.log(responsedata);
                setTrainings(responsedata);
            })
            .catch(error => console.error(error))
    }

    const deleteTraining = (params) => {
        if (window.confirm("Are you sure?")) {
            const customerUrl = params.data.customer._links.customer.href;
            const trainingId = params.data.id;
    
            fetch(customerUrl, { method: 'GET' })
                .then(response => {
                    if (response.ok) {
                        return fetch(`${customerUrl}/trainings/${trainingId}`, { method: 'DELETE' });
                    } else {
                        throw new Error('Customer not found.');
                    }
                })
                .then(deleteResponse => {
                    if (deleteResponse.ok) {
                        setOpenSnackbar(true);
                        setMsgSnackbar("Delete successful!");
                        getTrainings(); // päivitetään treenit
                    } else {
                        throw new Error('Delete failed.');
                    }
                })
                .catch(error => {
                    setOpenSnackbar(true);
                    setMsgSnackbar(error.message);
                    console.error(error);
                });
        }
    }



    // return
    return (
        <>
            {/*<AddTraining addTraining={addTraining} />*/}
            <div className="ag-theme-material" style={{ width: 1500, height: 600 }}>
                <AgGridReact
                    rowData={trainings}
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
    );

}