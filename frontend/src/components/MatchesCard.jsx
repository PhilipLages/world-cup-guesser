import React from 'react';

export default function MatchesCard({teamA, teamB, match}) {  
  return (
    <section className='content'>
          <span>{match.time}</span>
          <div className='matches-card'>
            <span>{ teamA.slug }</span>
            <img src={`src/assets/flags/${teamA.slug}.png`} alt={teamA.slug} />
            <input type="number" name="goals" />
            <span>X</span>            
            <input type="number" name="goals" />
            <img src={`src/assets/flags/${teamB.slug}.png`} alt={teamB.slug} />
            <span>{ teamB.slug }</span>
          </div>
        </section>
  )
}
