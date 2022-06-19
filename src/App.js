import './App.css';
import { useState, useEffect } from 'react'


function App() {
  const initialValues = {username:'', email:'', password:''}

  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors])
  

  const changeHandler = (e) => {
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value})
    console.log(formValues);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues))
    setIsSubmit(true);
  }

  const validate = (values) => {
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.username) {
      errors.username = "username is required"
    }
    if(!values.email) {
      errors.email = "email is required"
    } else if (!regex.test(values.email)) {
      errors.email = "email format not valid"
    }
    if(!values.password) {
      errors.password = "password is required"
    } else if (values.password.length < 4) {
      errors.password = "password too short"
    } else if (values.password.length > 10) {
      errors.password = "password too long"
    }
    return errors
  }

  return (
    <div className='app'>
      { Object.keys(formErrors).length === 0 & isSubmit ? (<div> Sign up success </div>) : (<pre> { JSON.stringify(formValues, undefined, 1) } </pre>) }

      
      <div className="container">
      <form onSubmit={submitHandler} >
        <h1>Login Form</h1>
        <div className='ui divider'></div>
        <div className='ui form'>
          <div className='field'>
            <label>Username</label>
            <input type="text" name='username' placeholder='username' value={formValues.username} onChange={changeHandler}/>
          </div>
          <p>{ formErrors.username }</p>
          <div className='field'>
            <label>Email</label>
            <input type="text" name='email' placeholder='email' value={formValues.email} onChange={changeHandler}/>
          </div>
          <p>{ formErrors.email }</p>
          <div className='field'>
            <label>Password</label>
            <input type="text" name='password' placeholder='password' value={formValues.password} onChange={changeHandler}/>
          </div>
          <p>{ formErrors.password }</p>
          <button className='button' >Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default App;
