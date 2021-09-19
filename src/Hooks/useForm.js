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

  const inputHandler = useCallback((event, section) => {
    
     const { name, value } = event.target;
     const newFormObj = {...formObj};
    // code runs if address section is split into billing section
     if(section === "billing") {
         newFormObj.address.billing[name].value = value;
         setFormObj({...newFormObj});
     }
     // code runs if address section is split into shipping section
     if(section === "shipping"){
        newFormObj.address.shipping[name].value = value;
        setFormObj({...newFormObj});

     } 
     // code runs if address section is not split and if the section is information section
     if(section === "address" || section === "information") {
        newFormObj[section][name].value = value;
        setFormObj({...newFormObj});
     }
    
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