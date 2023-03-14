import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from './CognitoContext';

const ResetPassword = () => {
    const [loggedin, setLoggedIn] = useState(false)

    const { getSession, logOut, authenticate } = useContext(AccountContext)

    useEffect(() => {
        const session = async () => {
            try {
                const user = await getSession()
                setLoggedIn(true)
            } catch (error) {
                setLoggedIn(false)
            }
        }
        session()
    }, [getSession, logOut, authenticate])
    return (
        <div>
            {
                loggedin ? <>
                    <ChangePassword />
                </> : <>
                    <h1>need Login for setting</h1>
                </>
            }
        </div>
    );
}

export default ResetPassword;



const ChangePassword = () => {
    const { getSession, logOut, authenticate } = useContext(AccountContext)
    const [state, setState] = useState({
        oldPassword: '',
        newPassword: '',
    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { user } = await getSession()

            if (user) {
                user.changePassword(state.oldPassword, state.newPassword, (err, result) => {
                    if (err) console.error(err)
                    console.log('===============changed=====================');
                    console.log(result);
                    console.log('====================================');
                })
            }
            console.log('===========user=========================');
            console.log(user);
            console.log('====================================');
        } catch (error) {

        }
    }
    return <>
        <div className='child'>
            Reset
            <form onSubmit={handleSubmit}>
                <div><label htmlFor="">oldPassword</label><input type="text" name="oldPassword" id="" onChange={(e) => handleChange(e)} /></div>
                <div><label htmlFor="">newPassword</label><input type="text" name="newPassword" id="" onChange={(e) => handleChange(e)} /></div>
                <div><button>Reset password</button></div>
            </form>
        </div>

    </>
}