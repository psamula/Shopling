import { useState, useEffect } from "react";
interface Props {
  name: string;
  title: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
  errorMessage: string;
}

const Input = ({
  name,
  title,
  type,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage,
}: Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [error, setError] = useState(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setError(false);
  };

  const onBlurHandler = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (isTouched) {
      const timeout = setTimeout(() => {
        if (!isValid) {
          setError(true);
        }
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isTouched, isValid, value]);

  return (
    
    <div className="mb-4 ">
      <div className="border-b border-purple-400 ">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        name={name}
        id={name}
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
      />
      </div>
       <p className={`text-xs text-red-500 ${error ? "" : "invisible"}`}>
        {errorMessage}
      </p>
    </div>
  );
};

export default Input;
