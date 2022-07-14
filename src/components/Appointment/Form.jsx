import React, {useState} from 'react';
import InterviewerList from "../InterviewerList";
import Button from "../Button";

const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [err, setErr] = useState(null);

  const reset = function () {
    setStudent("");
    setInterviewer(null);
    return;
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };
  const validateInput = function (interviewer, student) {
    if (!student) {
      setErr("Student name cannot be blank");
      return;
    } else if (!interviewer) {
      setErr("You must pick an interviewer");
      return;
    } else {
      setErr(null);
      props.onSave(student, interviewer);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            value={student}
            onChange={(e) => {
              setStudent(e.target.value)
            }}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => validateInput(interviewer, student)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
