import React from 'react'
import './demo.css'
import { useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { create, getValue } from '../redux/slice'
import { useEffect } from 'react'

const Demo1 = () => {
    //get 
    const [username, setUserName] = useState()
    const dispatch = useDispatch()
    const { name, pass, data } = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(getValue())
    },[])
    return (
        <>
            <p>{name}</p>

            <input type="text" name="name" id="" value={username} onChange={(e) => setUserName(e.target.value)} />
            <button onClick={() => dispatch(create(username))}>change</button>

            <div>
                {data?.map((value) => {
                    console.log(value);
                    return <>
                        <p>{value.name}</p>
                    </>
                })}
            </div>
        </>
    )
}

export default Demo1