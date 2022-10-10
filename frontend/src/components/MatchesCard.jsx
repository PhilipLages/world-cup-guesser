import React from 'react';

export default function MatchesCard({homeTeam, awayTeam, match}) {  
  return (
    <section className='content'>
          <span>{match.time}</span>
          <div className='matches-card'>
            <span>{ homeTeam.slug }</span>
            <img src={`src/assets/flags/${homeTeam.slug}.png`} alt={homeTeam.slug} />
            <input type="number" name="goals" />
            <span>X</span>            
            <input type="number" name="goals" />
            <img src={`src/assets/flags/${awayTeam.slug}.png`} alt={awayTeam.slug} />
            <span>{ awayTeam.slug }</span>
          </div>
        </section>
  )
}
