import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo/logo-fundo-branco.svg";

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
        <section className='content'>
          Content
        </section>
      </main>
    </section>
  )
}
