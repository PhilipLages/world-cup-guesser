import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import '../styles/forms.css';

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await axios({
      method: "post",
      baseURL: 'http://localhost:4000',
      url: "/users",
      data,
    });
    localStorage.setItem('auth', JSON.stringify(response.data))
    setIsLoading(false);
  }

  const [ name, userName, email, password ] = watch(["name", "userName", "email", "password"]);

  const isValid = name && userName && email && password;

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <div className='form-inputs'>
        <input 
        type="text" 
        {...register("name", {required: "Preencha seu nome"})} 
        placeholder='Digite seu nome'
        />
        <span>{errors.name?.message}</span>
        <input 
        type="text" 
        {...register("userName", {required: "Preencha seu nome de usuário"})} 
        placeholder='Digite um nome de usuário'
        />
        <span>{errors.userName?.message}</span>
        <input 
         type="text" 
         {...register("email", { 
          required: "Informe seu e-mail", 
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Informe um e-mail válido"
          } })}
         placeholder='Digite seu e-mail' 
        />
        <span>{errors.email?.message}</span>
      <input 
      type="password" 
      {...register("password", {
            required: "Digite uma senha",
            minLength: {
              value: 8,
              message: "Mínimo de 8 caracteres"
            }
      })} 
      placeholder='Digite sua senha'
      />
      <span>{errors.password?.message}</span>
      <button type='submit' disabled={!isValid}>
        {isLoading ? "Carregando..." : "Criar minha conta"}
      </button>
      </div>
    </form>
  )
}
