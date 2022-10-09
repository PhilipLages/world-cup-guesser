import React from 'react'
import { addDays, format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

const initialDate = '2022-11-20T00:00:00Z';

export default function ScheduleDate() {
  const [date, setDate] = useState(new Date(initialDate));

  const getNextDay = () => {
   const nextDay =  addDays(date, 1);
   setDate(nextDay);
  }

  const getPrevDay = () => {
    const prevDay = subDays(date, 1);
    setDate(prevDay);
  }

  const formatedDate = format(date, "d 'de' MMMM" , { locale: ptBR });

  return (
    <div className="dates" >
      <img src='src/assets/icons/arrow-left.svg' onClick={ getPrevDay }></img>
      <span>{ formatedDate }</span>
      <img src='src/assets/icons/arrow-right.svg' onClick={ getNextDay }></img>
    </div>
  )
}
