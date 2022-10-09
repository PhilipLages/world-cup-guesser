import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/forms.css';

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className='form-inputs'>
        <input type="text" {...register("name")} placeholder='Digite seu nome'/>
        <input type="text" {...register("username")} placeholder='Digite um nome de usuário'/>
        <input 
         type="email" 
         {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
         placeholder='Digite seu email' 
        />
      <input type="password" {...register("password")} placeholder='Digite sua senha'/>
      <button type='submit'>
        Criar minha conta
      </button>
      </div>
    </form>
  )
}
