
import Cognito from "./components/Cognito";
import Login from "./components/Login";
import CognitoContext from "./components/CognitoContext";
import Status from "./components/Status";
import ResetPassword from "./components/ResetPassword";
import './App.css'
function App() {

  return (
    <>
      {/* <Dev /> */}
      <CognitoContext>
        <div className="cognito-container">
          <Cognito />
          <Login />
          <ResetPassword />
        </div>
      </CognitoContext>
    </>
  );
}

export default App;
