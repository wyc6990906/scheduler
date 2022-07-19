import React, {useState} from 'react';
import InterviewerList from "../InterviewerList";
import Button from "../Button";

const Form = (props) => {
  const {student, interviewer, interviewers, onSave, onCancel} = props;

  const [studentName, setStudent] = useState(student || "");
  const [interviewerState, setInterviewer] = useState(interviewer || null);
  const [err, setErr] = useState(null);


  const reset = function () {
    setStudent("");
    setInterviewer(null);
    return;
  };

  const cancel = function () {
    reset();
    onCancel();
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
      onSave(student, interviewer);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            value={studentName}
            onChange={(e) => {
              setStudent(e.target.value)
              setErr(null);
            }}
            data-testid={"student-name-input"}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewerState} onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => validateInput(interviewerState, studentName)} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
