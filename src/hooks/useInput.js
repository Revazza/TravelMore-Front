import React, {  useState } from 'react';

function useInput(validateFunction) {

  const [value,setValue] = useState('');
  const [isTouched,setIsTouched] = useState(false);

  const input = validateFunction(value);
  const hasErrors = !input.isValid && isTouched;
  let errorMsg = '';
  if(hasErrors)
    errorMsg = input.errorMsg;

  const valueChangeHandler = (event) =>{
    setValue(event.target.value);
  }

  const valueLoseFocusHandler = () =>{
    setIsTouched(true);
  }

  return {
    value,
    errorMsg,
    hasErrors,
    input,
    valueChangeHandler,
    valueLoseFocusHandler,
  }
}

export default useInput;
