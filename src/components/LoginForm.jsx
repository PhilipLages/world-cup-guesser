import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../styles/forms.css";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    navigate("/dashboard");
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className='form-inputs'>
        <input 
         type="email" 
         {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
         placeholder='Digite seu email' 
        />
      <input type="password" {...register("password")} placeholder='Digite sua senha'/>
      <button type='submit'>
        Entrar
      </button>
      </div>
    </form>
  )
}
