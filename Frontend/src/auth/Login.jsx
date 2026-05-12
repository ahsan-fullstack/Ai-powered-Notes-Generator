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
        body: JSON.stringify(form)
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
    <div className="login-main h-[100vh] flex items-center justify-center bg-[var(--bg)]">
      <div className="login-main-wrapper my-8">

        <h1 className="text-center text-[26px] font-bold tracking-wide mb-5 text-[var(--gold)]">
          Closer to be the Toper
        </h1>

        <form
          className="flex flex-col justify-center gap-4 m-2 py-6 px-5 
      bg-[var(--surface)] border border-[var(--border)] 
      rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] w-[30rem] h-[20rem]"
        >

          {/* Email */}
          <div className="flex flex-col gap-1 relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="border border-[var(--border)] bg-[var(--surface2)] 
          text-[var(--text)] px-3 py-2 rounded-lg outline-none 
          focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold-dim)] 
          placeholder:text-[var(--text-dim)]"
            />
            <h1 className="text-[12px] text-[var(--red)]">{error.email}</h1>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="on"
              onChange={handleChange}
              className="border border-[var(--border)] bg-[var(--surface2)] 
          text-[var(--text)] px-3 py-2 rounded-lg outline-none 
          focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold-dim)] 
          placeholder:text-[var(--text-dim)]"
            />
            <h1 className="text-[12px] text-[var(--red)]">{error.password}</h1>
          </div>

          <div>
            <button
              type="button"
              className="cursor-pointer text-[var(--amber)] text-sm hover:underline"
            >
              Forgot Password ?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={submitting}
            onClick={handleSumbit}
            className="w-full 
        bg-[var(--gold)] text-[var(--bg)] 
        rounded-lg py-2 font-semibold cursor-pointer
        hover:bg-[var(--amber)] transition 
        disabled:opacity-60"
          >
            {submitting ? 'Login...' : 'Login'}
          </button>

          <div className="flex justify-end text-sm text-[var(--text-muted)]">
            <span>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[var(--gold)] hover:text-[var(--amber)] hover:underline cursor-pointer"
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
