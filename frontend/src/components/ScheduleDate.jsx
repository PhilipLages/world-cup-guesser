import React from 'react'
import { addDays, format, subDays, formatISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ScheduleDate({ date, setDate }) {
  const newDate = new Date(date);
  
  const getNextDay = () => {
   const nextDay =  addDays(newDate, 1);
   setDate(formatISO(nextDay));
  }

  const getPrevDay = () => {
    const prevDay = subDays(newDate, 1);
    setDate(formatISO(prevDay));
  }

  const formatedDate = format(new Date(date), "d 'de' MMMM" , { locale: ptBR });

  return (
    <div className="dates" >
      <img src='src/assets/icons/arrow-left.svg' onClick={ getPrevDay }></img>
      <span>{ formatedDate }</span>
      <img src='src/assets/icons/arrow-right.svg' onClick={ getNextDay }></img>
    </div>
  )
}
