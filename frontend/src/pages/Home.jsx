import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div>
        <Link to={"/signup"}>
          Criar minha conta
        </Link>
      </div>
      <div>
        <Link to={"/login"}>
          Entrar
        </Link>
      </div>
    </>
  )
}
