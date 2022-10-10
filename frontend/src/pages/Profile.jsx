import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { useLocalStorage, useAsyncFn } from 'react-use';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo/logo-fundo-branco.svg";
import ScheduleDate from '../components/ScheduleDate';
import MatchesCard from '../components/MatchesCard';
import "../styles/dashboard.css";


const initialDate = formatISO(new Date(2022, 10, 20));

export default function Profile() {
  const [date, setDate] = useState(initialDate);

  const [auth, setAuth] = useLocalStorage('auth', {});
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

  const navigate = useNavigate();

  const logout = () => setAuth({});

  if(!auth?.user?.id) {
    navigate("/");
  }

  return (
    <>
       <header>
        <div>
          <img src={ logo } alt="Logo" />
          <button type='button' onClick={ logout }>Sair</button>          
        </div>
        <div>
          <Link to={"/home"}>Voltar</Link>
        </div>
        <p>{ `Olá, ${ auth.user.name }` }</p>
      </header>
      <main>
        <h3>Seus palpites</h3>
        <section>
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
        </section>
      </main>
    </>
  )
}
