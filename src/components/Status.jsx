import React, { useContext, useEffect, useState } from 'react';
import { AccountContext } from './CognitoContext';

const Status = () => {
    const [state, setState] = useState(false)
    const { getSession, logOut, authenticate } = useContext(AccountContext)

    useEffect(() => {
        const session = async () => {
            try {
                const user = await getSession()
                console.log('================getSession====================');
                console.log(user);
                console.log('====================================');
                setState(true)
            } catch (error) {
                setState(false)
            }
        }
        session()
    }, [getSession, authenticate, logOut])
    return (
        <div>
            {state ? <button onClick={logOut}>Logout</button> : "please login"}
        </div>
    );
}

export default Status;
