import React from 'react'
import { Link } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'

export default function SignUp() {
  return (
    <>
      <header>
        <div>
          <Link to={"/"} >
            Voltar
          </Link>
          <h1>Crie seu cadastro</h1>
        </div>
      </header>
      <main>
        <SignUpForm />
      </main>
    </>
  )
}
