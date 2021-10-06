import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import AuthContext from "../Store/Auth/AuthContext";


const useHttp = (requestFn, dispatcherIsTrue) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({isValid: false, value:"", message:""});
    const ctx = useContext(AuthContext);
    const dispatch = useDispatch();

    const sendRequest = async (orgId, sendData) => {
        setIsLoading(true);
        let responseData;
        try {
            if(dispatcherIsTrue) {
               responseData =  await dispatch(requestFn(orgId, ctx.token));
            } else {
                responseData = await requestFn(orgId, ctx.token);
                sendData(responseData);  //transports the data from the server to the respective function component
            }   
        } catch (error) {
            setIsLoading(false);
            setError({
                isValid: error.isValid,
                message: error.message,
                value: error.value
            });
        }
        setTimeout(()=> {
            setIsLoading(false);
        },2000)
       
    }

    return {
        isLoading,
        sendRequest,
        error
    }

}

export default useHttp;