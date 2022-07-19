import {useState} from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);
  const transition = (modeNew, replace = false) => {
    if (!replace) {
      setHistory(history => [modeNew, ...history]);
    }
    setMode(modeNew);
  };
  const back = function () {
    if (history.length > 1) {
      setMode(history[1]);
      history.shift();
    }
  };

  return {mode, transition, back};
}
