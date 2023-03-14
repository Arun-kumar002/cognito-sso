import React, { useState } from 'react';
import Pool from '../UserPool'

const Cognito = () => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            console.log(state);
            Pool.signUp(state.username, state.password, [{ Name: "email", Value: state.email }], null, (err, data) => {
                if (err) console.error(err)
                console.log(data);
            })

        } catch (error) {

        }
    }
    return (
        <div className='child'>
            Register
            <form onSubmit={handleSubmit}>
                <div><label htmlFor="">username</label><input type="text" name="username" id="" onChange={(e) => handleChange(e)} /></div>
                <div><label htmlFor="">email</label><input type="text" name="email" id="" onChange={(e) => handleChange(e)} /></div>
                <div><label htmlFor="">password</label><input type="text" name="password" id="" onChange={(e) => handleChange(e)} /></div>
                <div><button>signup</button></div>
            </form>
        </div>
    );
}

export default Cognito;
