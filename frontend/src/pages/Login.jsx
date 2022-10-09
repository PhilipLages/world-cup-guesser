import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <>
      <header>
        <div>
          <Link to={"/"}>
            Voltar
          </Link>
          <h1>Faça seu login</h1>
        </div>
      </header>
      <main>
        <LoginForm />
      </main>
    </>
  )
}
