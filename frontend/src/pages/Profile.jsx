import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo/logo-fundo-branco.svg";

export default function Profile() {
  const [auth, setAuth] = useLocalStorage('auth', {});

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
        <p>Olá Usuário</p>
      </header>
      <main>
        <h3>Seus palpites</h3>
      </main>
    </>
  )
}
