import { /*useState,*/ useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};
const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return inputStateReducer;
};
const useInput = (isValid) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = isValid(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    //setEnteredValue(event.target.value);
    dispatch({ type: "INPUT", value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    //setIsTouched(true);
    dispatch({ type: "BLUR" });
  };
  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatch({ type: "RESET" });
  };
  return {
    /*value: enteredValue*/
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    inputBlurHandler,
    valueChangeHandler,
    reset,
  };
};
export default useInput;
