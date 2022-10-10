import React from 'react';
import axios from 'axios';
import { useLocalStorage } from 'react-use';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import "../styles/forms.css";
import { useState } from 'react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useLocalStorage('auth', {});
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await axios({
      method: "get",
      baseURL: 'http://localhost:4000',
      url: "/login",
      auth: {
        username: data.email,
        password: data.password,
      }
    });
    setAuth(response.data);
    setIsLoading(false);
  }
  
  if(auth?.user?.id) {
    navigate("/dashboard");
  }

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className='form-inputs'>
        <input 
         type="email" 
         {...register("email", { 
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Informe um e-mail válido"
          }})}
         placeholder='Digite seu email' 
        />
      <input 
      type="password" 
      {...register("password")} 
      placeholder='Digite sua senha'
      />
      <button type='submit'>
        {isLoading ? "Carregando..." : "Entrar"}
      </button>
      </div>
    </form>
  )
}
