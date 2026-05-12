// SignUp.jsx
import { useState } from "react";
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
    const validationErrors = handleError();
    SetError(validationErrors);

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
    } catch {
      setSubmitting(false)
    }
  }

  return (
    <div className="SignUp-main h-[100vh] bg-[var(--bg)] flex justify-center items-center">
      <div className="SignUp-main-wrapper my-8">

        <h1 className="text-center text-[25px] font-bold tracking-wide mb-4 text-[var(--gold)]">
          Closer to be the Toper
        </h1>

        <form
          className="flex flex-col justify-center gap-4 m-2 py-5 px-4 
      bg-[var(--surface)] border border-[var(--border)] 
      shadow-2xl w-[30rem] h-[30rem] rounded-2xl"
        >

          {/* Name */}
          <div className="flex flex-col gap-1 relative">
            <input
              type="text"
              name="userName"
              placeholder="Enter your name"
              onChange={handleChange}
              className="peer border border-[var(--border)] bg-[var(--surface2)]
          text-[var(--text)] px-3 py-2 rounded-lg outline-none
          focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold-dim)]
          placeholder:text-[var(--text-dim)]"
            />
            <h1 className="text-[12px] text-[var(--red)]">{error.name}</h1>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1 relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="peer border border-[var(--border)] bg-[var(--surface2)]
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
              className="peer border border-[var(--border)] bg-[var(--surface2)]
          text-[var(--text)] px-3 py-2 rounded-lg outline-none
          focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold-dim)]
          placeholder:text-[var(--text-dim)]"
            />
            <h1 className="text-[12px] text-[var(--red)]">{error.password}</h1>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1 relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              autoComplete="on"
              onChange={handleChange}
              className="peer border border-[var(--border)] bg-[var(--surface2)]
          text-[var(--text)] px-3 py-2 rounded-lg outline-none
          focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold-dim)]
          placeholder:text-[var(--text-dim)]"
            />
            <h1 className="text-[12px] text-[var(--red)]">{error.password}</h1>
            <h1 className="text-[12px] text-[var(--red)]">{error.confirmPassword}</h1>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={submitting}
            onClick={handleSumbit}
            className="w-full bg-[var(--gold)] text-[var(--bg)]
        rounded-lg py-2 font-semibold
        hover:bg-[var(--amber)] transition
        disabled:opacity-60 cursor-pointer"
          >
            {submitting ? 'SignUp...' : 'SignUp'}
          </button>

          {/* Login link */}
          <div className="flex justify-end text-sm text-[var(--text-muted)]">
            <span>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[var(--gold)] hover:text-[var(--amber)] hover:underline cursor-pointer"
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
