import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

export default function MyCalendar() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => getTrainings(), []);

    const getTrainings = () => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
            .then(response => response.json())
            .then(data => setTrainings(data));
    };

    let events = [];
    for (let i = 0; i < trainings.length; i++) {
        events.push({
            title:
                trainings[i].activity +
                " / " +
                trainings[i].customer.firstname +
                " " +
                trainings[i].customer.lastname,
            start: new Date(trainings[i].date),
            end: dayjs(trainings[i].date).add(trainings[i].duration, 'minutes').toDate(),
            allDay: false
        });
    }
    console.log(events);

    return (
        <div className="container mt-3" style={{ height: "80vh" }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}