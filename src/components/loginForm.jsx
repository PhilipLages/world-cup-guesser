import React from 'react';
import { useForm } from 'react-hook-form';
import "../styles/login.css";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className='login-inputs'>
        <input 
         type="email" 
         {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
         placeholder='Digite seu email' 
        />
      <input type="password" {...register("password")} placeholder='Digite sua senha'/>
      <button type='submit'>
        Enviar
      </button>
      </div>
    </form>
  )
}
