import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, formatISO } from 'date-fns';
import { Link, useParams } from 'react-router-dom';
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

  const params = useParams();

  const [{ value: user, loading, error }, fetchGuesses] = useAsyncFn(async () => {
    const response = await axios({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: `/${params.userName}`
    });

    const guesses = response.data.guesses.reduce((acc, curr) => {
      acc[curr.gameId] = curr;
      return acc;
    }, {});

    return {
      ...response.data,
      guesses,
    };
  });
  
  const [games, fetchGames] = useAsyncFn( async (params) => {
    const response = await axios({
      method: "get",
      baseURL: import.meta.env.VITE_API_URL,
      url: "/games",
      params
    });

    return response.data;
  });
  
  const logout = () => {
    setAuth({});
    navigate("/login");
  } 

  useEffect(() => {
    fetchGuesses();
  }, [])

  useEffect(() => {
    fetchGames({ gameTime: date });
  }, [date]);

  const isLoading = games.loading || loading;
  const hasError = games.error || error;
  const isDone = !isLoading && !hasError;

  const navigate = useNavigate();

  return (
    <>
       <header>
        <div>
          <img src={ logo } alt="Logo" />
          {auth?.user?.id && (
            <button type='button' onClick={ logout }>Sair</button> 
          )}
        </div>
        <div>
          <Link to={"/dashboard"}>Voltar</Link>
        </div>
        <p>{ `${ user?.name }` }</p>
      </header>
      <main>
        <h3>Seus palpites</h3>
        <section>
        <ScheduleDate date={ date } setDate={ setDate }/>
        <section className='container'>
          {isLoading && "Carregando partidas..."}
          {hasError && "Ops! Algo deu errado."}

          {isDone && games.value?.map(game => (
            <MatchesCard 
              key={game.id}
              gameId={ game.id }
              homeTeam={ game.homeTeam }
              awayTeam={ game.awayTeam }
              gameTime={ format(new Date(game.gameTime), "H:mm") }
              homeTeamScore={ user?.guesses?.[game.id]?.homeTeamScore || '' }
              awayTeamScore={ user?.guesses?.[game.id]?.awayTeamScore || '' }
              disabled={ true }
            />
          ))}
        </section>
        </section>
      </main>
    </>
  )
}
