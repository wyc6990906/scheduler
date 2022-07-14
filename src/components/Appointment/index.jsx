import React from 'react';
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "./style.scss"

const Appointment = (props) => {
  // console.log(props)
  const {time, interview} = props
  return (
    <article className="appointment">
      <Header time={time}/>
      {interview === undefined ?
        <Empty/> : <Show student={props.interview.student}
                         interviewer={props.interview.interviewer}/>
      }

    </article>
  );
};

export default Appointment;
