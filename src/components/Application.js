import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment/index";
import {getAppointmentsForDay, getInterviewer, getInterviewersForDay} from "../helpers/selector"
import useApplicationData from "hooks/useApplicationData.js";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  } = useApplicationData();
  let dailyInterviewers = [];
  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day)
  dailyInterviewers = getInterviewersForDay(state, state.day);



  const appointmentsList = [dailyAppointments.map(
    appointment => {
      const interview = getInterviewer(state, appointment.interview);
      return (
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          deleteInterview={deleteInterview}
        />
      );
    }
  ), <Appointment key="last" time="5pm"/>];

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered"/>
        <nav className="sidebar__menu">
          {/*DayList component*/}
          <DayList
            day={state.day}
            days={state.days}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsList}
      </section>
    </main>
  );
}
