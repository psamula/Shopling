import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";
import Lists from "../components/Lists/Lists";

const Main = () => {
  const navigate = useNavigate();


  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, []);


  return (
    <div className="z-5 h-screen flex w-screen flex-col bg-gray-900">
      <Lists></Lists>
    </div>
  );
};

export default Main;
