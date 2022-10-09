import React from 'react'

export default function Profile() {
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
      </header>
      <main>
        <h3>Seus palpites</h3>
      </main>
    </>
  )
}
