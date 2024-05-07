import React from 'react';
// import './App.css';
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar';
import Home from './components/home';
import CustomerList from './components/customerList';
import TrainingList from './components/trainingList';
import MyCalendar from './components/calendar';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Personal Trainer</Typography>
          <Navbar />
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/calendar" element={<MyCalendar />} />
        {/*<Route path="*" element={<NotFound />} /> {/* Optional: 404 page */}
      </Routes>
    </>
  );
}

export default App;

{/*import { useState } from 'react'
import './App.css'
import { AppBar, Toolbar, Typography } from "@mui/material"
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/navBar'
import Home from './components/home'
import CustomerList from './components/customerList'
import TrainingList from './components/trainingList'
import MyCalendar from './components/calendar'

function App() {

  return (
    <>
      {/*<AppBar position="static">
						<Toolbar>
							<Typography variant="h6">Personal Trainer</Typography>
						</Toolbar>
        </AppBar>}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/calendar" element={<MyCalendar />} />
      </Routes>
    </>
  );
}

export default App;*/}
