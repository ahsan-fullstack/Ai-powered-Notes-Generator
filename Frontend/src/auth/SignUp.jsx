// SignUp.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({ userName: "", email: "", password: "", confirmPassword: "" });
  const [error, SetError] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleError = () => {
    const newError = {};
    if (!form.userName) newError.userName = "userName is required"
    if (!form.email) newError.email = "Email is required"
    if (!form.password) newError.password = "Password is required"
    if (form.password.length < 8) newError.password = "Password must be of length 8"
    if (form.password !== form.confirmPassword) newError.confirmPassword = "Password does't match"

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
      console.log(form, 'form')
      const result = await fetch(`${import.meta.env.VITE_API_KEY}/auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          form
        })
      })
      setSubmitting(false)
      const res = await result.json();
      console.log(res, ' res ')
    } catch (error) {
      setSubmitting(false)
    }
  }

  return (
    <div className="SignUp-main h-[100vh]">
      <div className="SignUp-main-wrapper my-8 h-[557.66px] flex flex-col items-center">
        <h1 className="text-center text-[25px] font-bold tracking-wide mb-4">
          Closer to be the Toper
        </h1>

        <form
          className="flex flex-col justify-center gap-4 m-2 py-4 px-3 bg-[#fff] border 
          border-gray-300 shadow-xl w-[30rem] h-[30rem]"
        >

          {/* Name field */}
          <div className="flex flex-col gap-1 relative">
            <input
              type="text"
              id="name"
              name="userName"
              className={`peer border border-gray-300 px-2 py-2 rounded outline-none`}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            <h1 className="text-[12px] text-[red]">{error.name}</h1>
          </div>

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
          {/* Password field */}
          <div className="flex flex-col gap-1 relative">
            <input
              placeholder="Confirm password"
              type="password"
              name="confirmPassword"
              className={`peer border border-gray-300 px-2 py-2 rounded outline-none`}
              autoComplete="on"
              onChange={handleChange}
            />
            <h1 className="text-[12px] text-[red]">{error.password}</h1>
            <h1 className="text-[12px] text-[red]">{error.confirmPassword}</h1>
          </div>

          {/* SignUp button (replace with your <app-button> equivalent) */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white rounded py-2 font-semibold hover:bg-blue-700 
            transition disabled:opacity-60
            cursor-pointer"
            onClick={handleSumbit}
          >
            {submitting ? 'SignUp...' : 'SignUp'}
          </button>

          <div className="flex justify-end text-sm">
            <span>
              Already have an account?{" "}
              {/* If you use react-router */}
              <Link
                to="/login"
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
