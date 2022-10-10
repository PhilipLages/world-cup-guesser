import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useLocalStorage } from 'react-use';

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  homeTeamScore: yup.string().required(),
  awayTeamScore: yup.string().required()
})

export default function MatchesCard({ gameId, homeTeam, awayTeam, gameTime, homeTeamScore, awayTeamScore , disabled}) {  
  const [auth] = useLocalStorage('auth', {});

  const formik = useFormik({
    onSubmit: (values) => {
      axios({
        method: "post",
        baseURL: import.meta.env.VITE_API_URL,
        url: '/guesses',
        headers: {
          authorization: `Bearer ${auth.accessToken}`
        },
        data: {
          ...values,
          gameId
        }
      })
    },
    initialValues: {
      homeTeamScore,
      awayTeamScore
    },
    validationSchema
  });

  return (
    <section className='content'>
          <span>{ gameTime }</span>

          <form className='matches-card'>
            <span>{ homeTeam }</span>
            <img src={`src/assets/flags/${ homeTeam }.png`} alt={homeTeam} />
            <input 
            type="number"
            name='homeTeamScore'
            value={formik.values.homeTeamScore}          
            onChange={ formik.handleChange }
            onBlur={formik.handleSubmit}
            disabled={ disabled }
            />

            <span>X</span>          

            <input 
            type="number"
            name='awayTeamScore'
            value={formik.values.awayTeamScore}          
            onChange={ formik.handleChange }
            onBlur={formik.handleSubmit}    
            disabled={ disabled }
            />
            <img src={`src/assets/flags/${ awayTeam }.png`} alt={awayTeam} />
            <span>{ awayTeam }</span>
          </form>
        </section>
  )
}
