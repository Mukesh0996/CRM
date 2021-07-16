import { useEffect, useState, useCallback, useContext } from "react";
import useHttp from "./httpHook"
import AuthContext from "../Store/Auth/AuthContext";

const useForm = (requestFn) => {

    const { isLoading, error, sendRequest } =  useHttp(requestFn, false);
    const [formObj, setFormObj]= useState({});  
    const ctx = useContext(AuthContext);
    
    useEffect(() => {
        sendRequest(ctx.orgId, (data)=> {
            setFormObj(data);
        })
    },[]);
    console.log(formObj);
  const inputHandler = useCallback((event, section) => {
   
     const { name, value } = event.target;
     console.log(name, value);
     const newFormObj = {...formObj};
     console.log(newFormObj[section]);
     newFormObj[section][name].value = value;
     setFormObj({...newFormObj});

  },[formObj])
   
    return {
        inputHandler,
        isLoading,
        httpError: error,
        address: formObj.address,
        information: formObj.information
    }
}

export default useForm;