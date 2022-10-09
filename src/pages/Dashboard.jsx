import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo/logo-fundo-branco.svg";
import MatchesCard from '../components/MatchesCard';
import "../styles/dashboard.css"

export default function Dashboard() {
  return (
    <section>
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
        <div className="dates" >
          <img src='src/assets/icons/arrow-left.svg'></img>
          <span>24 de Novembro</span>
          <img src='src/assets/icons/arrow-right.svg'></img>
        </div>
        <section className='container'>
          <MatchesCard 
          teamA={{ slug: 'sui' }}
          teamB={{ slug: 'cam' }}
          match={{ time: '7:00' }}
          />
          <MatchesCard 
          teamA={{ slug: 'uru' }}
          teamB={{ slug: 'cor' }}
          match={{ time: '7:00' }}
          />
          <MatchesCard 
          teamA={{ slug: 'por' }}
          teamB={{ slug: 'gan' }}
          match={{ time: '7:00' }}
          />
        </section>
      </main>
    </section>
  )
}
