import { useEffect, useState } from "react";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Date from "./Date";
import useApi from "../../hooks/use-api";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

interface Props {
  onSuccess: () => void;
}

interface Response {
  token?: string;
  message?: string;
}

const RegisterForm = ({ onSuccess }: Props) => {
  const navigate = useNavigate();
  const { response, loading, error, fetch } = useApi<Response>("/register", {
    method: "POST",
  });

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("1990-01-01");
  const [number, setNumber] = useState("");

  const validName = name.length > 0;
  const validEmail = email.includes("@");
  const validPassword = password.length >= 6;
  const validConfirmPassword = confirmPassword === password;
  const validDateOfBirth = dateOfBirth.length > 0;
  const validNumber = number.length == 9 && !isNaN(parseInt(number));
  const validUsername = username.length > 0;

  const formValid =
    validEmail &&
    validPassword &&
    validConfirmPassword &&
    validName &&
    validDateOfBirth &&
    validNumber &&
    validUsername &&
    !loading;

  const onSignInHandler = () => {
    navigate("/login");
  };

  const onSubmitHandler = () => {
    if (!formValid) return;
    fetch({
      firstName: name,
      lastName: "string",
      username,
      email,
      image: "string",
      password,
      phone_nr: number,
      dateOfBirth,
    });
  };

  useEffect(() => {
    if (response?.ok) {
      onSuccess();
    }
  }, [response, onSuccess]);
  return (
    <Form onSubmit={onSubmitHandler}>
      {error && <h2 className="text-red-600">{error}</h2>}
      <Input
        name="name"
        title="Name"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={setName}
        isValid={validName}
        errorMessage="Please enter your name."
      />
      <Input
        name="username"
        title="Choose a username"
        type="text"
        placeholder="Your username"
        value={username}
        onChange={setUsername}
        isValid={validUsername}
        errorMessage="Please enter a unique username."
      />
      <Input
        name="email"
        title="Email"
        type="email"
        placeholder="Your email"
        value={email}
        onChange={setEmail}
        isValid={validEmail}
        errorMessage="Please enter a valid email address."
      />
      <Input
        name="password"
        title="Password"
        type="password"
        placeholder="Your password"
        value={password}
        onChange={setPassword}
        isValid={validPassword}
        errorMessage="Password must be at least 6 characters long."
      />
      <Input
        name="confirm-password"
        title="Confirm Password"
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        isValid={validConfirmPassword}
        errorMessage="Passwords must match."
      />
      <Input
        name="number"
        title="Enter your phone number"
        type="number"
        placeholder="Your phone number"
        value={number}
        onChange={setNumber}
        isValid={validNumber}
        errorMessage="Please enter a valid phone number."
      />
      <Date
        name="date-of-birth"
        title="Date of birth"
        value={dateOfBirth}
        onChange={setDateOfBirth}
        isValid={validDateOfBirth}
        errorMessage="Please enter your date of birth."
      />
      <Button text={"Register"} disabled={!formValid} loading={loading} />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center ">
        <div className="p-5 text-black font-bold">
        If you have an account{" "}
        </div>
        <a 
        className="text-purple-400 border-purple-400 cursor-pointer inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10" 
        onClick={onSignInHandler}>
          Log in
        </a>
      </p>
      {error && <h2 className="text-red-600">{error}</h2>}
    </Form>

  );
};

export default RegisterForm;
