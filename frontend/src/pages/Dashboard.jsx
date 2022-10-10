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

export default function Dashboard() {
  const [date, setDate] = useState(initialDate);
  const [auth, setAuth] = useLocalStorage('auth', {});

  const [guesses, fetchGuesses] = useAsyncFn(async () => {
    const response = await axios({
      method: "get",
      baseURL: "http://localhost:4000",
      url: `/${auth.user.userName}`
    });

    const guesses = response.data.reduce((acc, curr) => {
      acc[curr.gameId] = curr;
      return acc;
    }, {});

    return guesses;
  });
  
  const [games, fetchGames] = useAsyncFn( async (params) => {
    const response = await axios({
      method: "get",
      baseURL: "http://localhost:4000",
      url: "/games",
      params
    });

    return response.data;
  });
  
  const logout = () => setAuth({});

  useEffect(() => {
    fetchGuesses();
  }, [])

  useEffect(() => {
    fetchGames({ gameTime: date });
  }, [date]);

  const isLoading = games.loading || guesses.loading;
  const hasError = games.error || guesses.error;
  const isDone = !isLoading && !hasError;

  const navigate = useNavigate();


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
          <Link to={`/${auth.user?.userName}`}>Perfil</Link>
        </div>
        <p>{ `Olá, ${ auth.user.name }` }</p>
        <h3>Qual é o seu palpite?</h3>
      </header>
      <main>
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
              homeTeamScore={ guesses?.value?.[game.id]?.homeTeamScore || '' }
              awayTeamScore={ guesses?.value?.[game.id]?.awayTeamScore || '' }
            />
          ))}
        </section>
      </main>
    </>
  )
}
