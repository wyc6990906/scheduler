import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {},
  });

  //Axios requests
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Retrieve each spot for a given day
  function fetchSpots(state, appointments) {
    let count = 0;
    for (const id of state.appointments) {
      if (appointments[id].interview === null) {
        count += 1;
      }
    }
    return count;
  }

  //update each spot by returning an array
  function updateInterviewSpots(nameOfDay, daysState, appointments) {
    const current = daysState.find(day => day.name === nameOfDay);
    const spots = fetchSpots(current, appointments);

    const final = daysState.map(val =>
      val.name === nameOfDay ? {...current, spots} : val
    );

    return final;
  }

  //SetDay Function
  const setDay = day => setState({...state, day});

  //Book an interview
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...updateInterviewSpots(state.day, state.days, appointments)];

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(result => {
        setState(prev => ({
          ...prev,
          appointments: appointments,
          days,
        }));
      });
  };

  //Delete an interview
  const deleteInterview = function (id) {
    const cancelInterview = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = state.appointments;
    appointments[id] = cancelInterview;

    const days = [...updateInterviewSpots(state.day, state.days, appointments)];

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(result => {
        setState(prev => ({
          ...prev,
          appointments: appointments,
          days,
        }));
      });
  };

  return {state, setDay, bookInterview, deleteInterview};
}
