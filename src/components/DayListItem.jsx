import React from 'react';
import classNames from "classnames";
import "./DayListItem.scss"

const DayListItem = (props) => {
  // console.log('DayItem Props:',props)
  const {spots, selected, name, setDay} = props
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  })

  const formatSpots = () => {
    if (spots === 1) {
      return "1 spot remaining"
    }
    if (spots === 0) {
      return "no spots remaining"
    }
    if (spots > 1) {
      return `${spots} spots remaining`;
    }

  }

  return (
    <li className={dayClass} selected={selected} onClick={() => {
      setDay(name)
    }}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};

export default DayListItem;
