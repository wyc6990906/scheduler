import React from 'react';
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const {days} = props
  const dayListItems = days.map((item) => {
    return (
      <DayListItem key={item.id} name={item.name} spots={item.spots} selected={item.name === props.value}
                   setDay={() => props.onChange(item.name)}
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
