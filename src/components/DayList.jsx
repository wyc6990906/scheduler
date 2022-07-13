import React from 'react';
import DayListItem from "./DayListItem";

const DayList = (props) => {
  // console.log(props)
  const {days} = props
  const dayListItems = days.map((item) => {
    return (
      <DayListItem key={item.id} name={item.name} spots={item.spots} selected={item.name === props.day}
                   setDay={props.setDay}
      />
    )
  })


  return (
    <ul>
      {dayListItems}
    </ul>
  );
};

export default DayList;
