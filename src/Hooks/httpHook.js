import { useContext, useState } from "react"
import AuthContext from "../Store/AuthContext";


const useHttp = (requestFn) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({isValid: false, value:"", message:""});
    const ctx = useContext(AuthContext);
    const sendRequest = async (data, sendData) => {
        setIsLoading(true);
        try {
           const responseData = await requestFn(data, ctx.token);
           sendData(responseData);
        } catch (error) {
            setIsLoading(false);
            setError({
                isValid: error.isValid,
                message: error.message,
                value: error.value
            })
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