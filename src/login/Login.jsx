import { useState } from "react";
import "./login.css";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/LoginService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {

  const [inputs, setInputes] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputes((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await login(inputs.username, inputs.password);
      if (!res.data.status) {
        toast.error("Wrong Credentials!!😢");
      }
      if (res.data.status) {
        localStorage.setItem("loginStatus", JSON.stringify(res.data.status));
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        if (res.data.data.roleType === "ADMIN") {
          toast.success("Admin login successfully!!😊");
          return navigate("/admin-dashboard");
        } else if (res.data.data.roleType === "CEO") {
          toast.success("Ceo login successfully!!😊");
          return navigate("/ceo-dashboard");
        } else if (res.data.data.roleType === "COORDINATOR") {
          toast.success("Coordinator login successfully!!😊");
          return navigate("/manager-dashboard");
        } else if (res.data.data.roleType === "MANAGER") {
          toast.success("Manager login successfully!!😊");
          return navigate("/manager-dashboard");
        }
        else {
          toast.error("Something went wrong!1😢");
          return navigate(0);
        }
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong!!");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <h1 className="text-2xl font-extrabold mb-5">Welcome, to RC Dashboard</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <label htmlFor="username" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <input
                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                  <label htmlFor="Password" className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    className="w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" onClick={handleSubmit} type="submit">
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy={7} r={4} />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">
                      {
                        loading ? (
                          <AiOutlineLoading3Quarters className="flex items-center justify-center w-full animate-spin" />
                        ) : (
                          "Login In"
                        )
                      }
                    </span>

                  </button>
                  <div className="mt-5 text-gray-800 font-bold flex justify-center">
                    <Link to={`/forget`}>Forget Password?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")'
              }}
            >
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
