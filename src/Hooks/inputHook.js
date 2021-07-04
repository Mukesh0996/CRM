import { useReducer } from "react";

const initialState = {
    value:"",
    isTouched: false
}

const inputStateReducer = (state, action) => {

    if(action.type ==="INPUT") {
        return { value: action.val, isTouched: state.isTouched}
    }
    if(action.type==="BLUR" && state.value.length === 0) {
        return { value: "", isTouched: false }
    }
    if(action.type==="BLUR" && state.value.length > 0) {
        return { value: state.value, isTouched: true }
    }
}


const useInput = (validate) => {
    const [inputState, dispatcher] = useReducer(inputStateReducer, initialState);
    const isValid = validate(inputState.value);

    const valueChangeHandler = (event) => {
        dispatcher({type:"INPUT", val:event.target.value})
    }

    const blurHandler = () => {
        dispatcher({type:"BLUR"})
    }


    return {
        value: inputState.value,
        valueChangeHandler,
        isValid,
        blurHandler,
        isTouched: inputState.isTouched
    }

}

export default useInput;