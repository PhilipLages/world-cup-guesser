import axios from 'axios';
import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage, useAsync } from 'react-use';
import logo from "../assets/logo/logo-fundo-branco.svg";
import MatchesCard from '../components/MatchesCard';
import ScheduleDate from '../components/ScheduleDate';
import "../styles/dashboard.css"

export default function Dashboard() {
  const [auth] = useLocalStorage('auth', {});
  const  state = useAsync( async () => {
    const response = await axios({
      method: "get",
      baseURL: "http://localhost:4000",
      url: "/games",
    });

    return response.data;
  });

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
        <ScheduleDate />
        <section className='container'>
          {state.loading && "Carregando partidas..."}
          {state.error && "Ops! Algo deu errado."}
          {!state.loading && !state.error && state.value.map(game => (
            <MatchesCard 
            homeTeam={{ slug: game.homeTeam }}
            awayTeam={{ slug: game.awayTeam }}
            match={{ time: format(new Date(game.gameTime), "H:mm") }}
            />
          ))}
        </section>
      </main>
    </>
  )
}
