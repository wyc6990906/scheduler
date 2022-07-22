import React from 'react';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types"
import "./InterviewerList.scss"

const InterviewerList = (props) => {
  const {interviewers} = props
  // console.log(props)
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  }
  const interviewerListItems = interviewers.map((interviewer) => {
    return (
      //fix cannot create/edit an appointment
      <InterviewerListItem key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar}
                           selected={interviewer.id === props.interviewer}
                           setInterviewer={() => {
                             props.setInterviewer(interviewer.id)
                           }}

      />
    )
  })


  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>
        Interviewer
      </h4>
      <ul className='interviewers__list'>
        {interviewerListItems}
      </ul>
    </section>
  );
};

export default InterviewerList;
