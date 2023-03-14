import React, { useContext } from "react";
import { HooksContext } from "./Hooks";

const Edit = () => {
  const state = useContext(HooksContext);


  return (
    <>
    <p>{state?.state}</p>

      <button onClick={()=>state?.setState(state?.state+1)}>edit</button>
    </>
  )
};

export default Edit;
