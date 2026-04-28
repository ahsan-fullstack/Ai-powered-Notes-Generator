// Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { SetToLocal } from "../utils/SetToLocal";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, SetError] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate();

  const handleError = () => {
    const newError = {};
    if (!form.email) newError.email = "Email is required"
    if (!form.password) newError.password = "Password is required"
    if (form.password.length < 8) newError.password = "Password must be of length 8"
    return newError
  }
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSumbit = async (e) => {
    e.preventDefault()
    const error = handleError();
    SetError(error);

    setSubmitting(true)

    try {
      const result = await fetch(`${import.meta.env.VITE_API_KEY}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(form) 
      })
      setSubmitting(false)
      const res = await result.json();
      console.log(res)
      SetToLocal(res.token);
      navigate('/')
    } catch {
      setSubmitting(false)
    }

  }

  return (
    <div className="login-main h-[100vh]">
      <div className="login-main-wrapper my-8 h-[557.66px] flex flex-col items-center">
        <h1 className="text-center text-[25px] font-bold tracking-wide mb-4">
          Closer to be the Toper
        </h1>

        <form
          className="flex flex-col justify-center gap-4 m-2 py-4 px-3 bg-[#fff] border border-gray-300 shadow-xl w-[30rem] h-[20rem]"
        >
          {/* Email field */}
          <div className="flex flex-col gap-1 relative">
            <input
              type="email"
              id="email"
              name="email"
              className={`peer border border-gray-300 px-2 py-2 rounded outline-none`}
              placeholder="Email"
              onChange={handleChange}
            />
            <h1 className="text-[12px] text-[red]">{error.email}</h1>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1 relative">
            <input
              placeholder="Password"
              type="password"
              name="password"
              className={`peer border border-gray-300 px-2 py-2 rounded outline-none`}
              autoComplete="on"
              onChange={handleChange}
            />
            <h1 className="text-[12px] text-[red]">{error.password}</h1>
          </div>

          <div>
            <button
              type="button"
              className="cursor-pointer text-blue-600 text-sm hover:underline"

            >
              Forgot Password ?
            </button>
          </div>

          {/* Login button (replace with your <app-button> equivalent) */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            onClick={handleSumbit}
          >
            {submitting ? 'Login...' : 'Login'}
          </button>

          <div className="flex justify-end text-sm">
            <span>
              Don't have an account?{" "}
              {/* If you use react-router */}
              <Link
                to="/SignUp"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                SignUp
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
