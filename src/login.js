import React from 'react'
import {Link} from 'react-router-dom'
import Validation from './loginValidation';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Hero from "./components/home/hero/Hero";


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})
  const handleInput = (event) => {
    setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          if (res?.data) {
            navigate('/home');
          } else {
            alert("No record exist");
          }
        })
        .catch(err => console.log(err));
    }

  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Hero />
      <div className='bg-white p-3 rounded w-25'>
        <h2>Log In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div classname='mb-3'>
            <lable htmlFor="email"><strong>Email</strong></lable>
            <input type="email" placeholder='Enter Email' name='email'
                   onChange={handleInput} className='form-control rounded-0'/>
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div classname='mb-3'>
            <lable html="password"><strong>Password</strong></lable>
            <input type="password" placeholder='Enter Password' name='password'
                   onChange={handleInput} className='form-control rounded-0'/>
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <p></p>
          <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>

          <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-50 text-decoration-none'> Create
            Account</Link>

        </form>
      </div>
    </div>
  )
}

export default Login
