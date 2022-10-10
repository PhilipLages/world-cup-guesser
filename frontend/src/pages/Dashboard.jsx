import React, { useState } from 'react';
import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage, useAsyncFn } from 'react-use';
import logo from "../assets/logo/logo-fundo-branco.svg";
import MatchesCard from '../components/MatchesCard';
import ScheduleDate from '../components/ScheduleDate';
import "../styles/dashboard.css";

const initialDate = formatISO(new Date(2022, 10, 20));

export default function Dashboard() {
  const [date, setDate] = useState(initialDate);

  const [auth] = useLocalStorage('auth', {});
  const [state, doFetch] = useAsyncFn( async (params) => {
    const response = await axios({
      method: "get",
      baseURL: "http://localhost:4000",
      url: "/games",
      params
    });

    return response.data;
  });

  useEffect(() => {
    doFetch({ gameTime: date });
  }, [date])

  if(!auth?.user?.id) {
    navigate("/");
  }

  return (
    <>
      <header>
        <div>
          <img src={ logo } alt="Logo" />          
        </div>
        <div>
          <Link to={"/home"}>Voltar</Link>
          <Link to={"/profile"}>Perfil</Link>
        </div>
        <p>Olá Usuário</p>
        <h3>Qual é o seu palpite?</h3>
      </header>
      <main>
        <ScheduleDate date={ date } setDate={ setDate }/>
        <section className='container'>
          {state.loading && "Carregando partidas..."}
          {state.error && "Ops! Algo deu errado."}
          {!state.loading && !state.error && state.value?.map(game => (
            <MatchesCard 
            key={game.id}
            gameId={ game.id }
            homeTeam={ game.homeTeam }
            awayTeam={ game.awayTeam }
            gameTime={ format(new Date(game.gameTime), "H:mm") }
            />
          ))}
        </section>
      </main>
    </>
  )
}
