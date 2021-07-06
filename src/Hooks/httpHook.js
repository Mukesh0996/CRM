import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import AuthContext from "../Store/Auth/AuthContext";


const useHttp = (requestFn, dispatcherIsTrue) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({isValid: false, value:"", message:""});
    const ctx = useContext(AuthContext);
    const dispatch = useDispatch();

    const sendRequest = async (data, sendData) => {
        setIsLoading(true);
        let responseData;
        try {
            if(dispatcherIsTrue) {
                responseData = await dispatch(requestFn(data, ctx.token));
            } else {
                responseData = await requestFn(data, ctx.token);
                sendData(responseData); 
            }   
                 
        } catch (error) {
            console.log(responseData)
            setIsLoading(false);
            setError({
                isValid: error.isValid,
                message: error.message,
                value: error.value
            });

        }
        setIsLoading(false);
    }

    return {
        isLoading,
        sendRequest,
        error
    }

}

export default useHttp;