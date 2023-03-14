import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
export const AccountContext = createContext();
function CognitoContext({ children }) {
  const getSession = async () => {
    return new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();

      if (!user) reject();

      user.getSession(async (err, session) => {
        if (err) reject(err);
        const attributes = await new Promise((resolve, reject) => {
          user.getUserAttributes((err, attributes) => {
            if (err) reject(err);
            let result = {};
            for (let key in attributes) {
              const { Name, Value } = key;
              result[Name] = Value;
            }
            resolve(result);
          });
        });
        resolve({ user, ...session, ...attributes });
      });
    });
  };

  const authenticate = async (state) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: state.email,
        Pool: Pool,
      });

      const authDetails = new AuthenticationDetails({
        Username: state.email,
        Password: state.password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.log("==================failere==================");
          console.error(err, "onfailure");
          console.log("====================================");
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log(
            "============new password required========================",
            data
          );
          resolve(data);
          console.log("====================================");
        },
      });
    });
  };

  const logOut = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logOut }}>
      {children}
    </AccountContext.Provider>
  );
}

export default CognitoContext;
