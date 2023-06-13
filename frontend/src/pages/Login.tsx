import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";
import { useEffect } from "react";
import { getToken, setToken } from "../utils/auth";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/", { replace: true });
    }
  }, []);

  const onSuccessHandler = () => {
    navigate("/");
  };

  return (

    <div className="flex items-center justify-center bg-gray-900">

      <div className=" z-10  h-screen bg-gray-900 sm:shadow-lg">
        <div
          className="g-6 flex h-full text-white flex-col justify-center" >
          <div className="w-full">
            <div
              className="block rounded-lg bg-gray-900">
              <div className="g-0 lg:flex lg:flex-wrap">

                <div className="px-4 md:px-0 lg:w-100%">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      
                      <h4 className="mb-12 mt-12 pb-1 text-xl font-semibold">
                        Start Your Shopping with Shopling
                      </h4>
                      <img
                        className="mx-auto w-48"
                        src="/public/LogoName.svg"
                        alt="logo" />
                    </div>
                    <LoginForm onSuccess={onSuccessHandler} />

                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
