import { useState } from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  console.log(values)
  // const [active, setActive] = useState(false);



  const handelSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4000/api/loginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok && data.success) {

        localStorage.setItem('userEmail', values.email);
        localStorage.setItem('token', data.token);
        navigate('/');

      } else {
        // Login failed
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }


  }
  return (
    <>
      <section className="h-screen bg-slate-300">
        <div className="">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">

              <img
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
                className="h-auto md:h-screen w-full"
                alt="signup" />
               
            </div>

            <div className=" mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              {/* <div
                class="mb-4 w-1/3 rounded-lg bg-green-100 px-6 py-5 text-base text-green-500"
                role="alert">
                Login Sucessful!
              </div> */}
              <form onSubmit={handelSubmit}>

                <div className="relative mb-6">
                  <input
                    type="email"
                    className=" min-h-[auto] w-auto lg:w-5/6  rounded border border-stone-500 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"

                    name='email'
                    value={values.email}
                    placeholder="Email Address"
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                  />

                </div>

                <div className="relative mb-6" t>
                  <input
                    type="password"
                    className=" min-h-[auto] w-auto lg:w-5/6  rounded  border border-stone-500  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "

                    placeholder="Password"
                    name='password'
                    value={values.password}
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                  />

                </div>
                <div className="text-center lg:text-left">
                  <button
                    type="submit"
                    className="inline-block rounded px-7 pb-2.5 pt-3 bg-yellow-300 font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                    Login
                  </button>
                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Don't have an account?
                    <Link
                      className="text-red-500 pl-2 hover:text-red-600  underline underline-offset-8"
                      to="/signup">
                      Sign Up
                    </Link>

                  </p>
                </div>
              </form>

            </div>

          </div>

        </div>

      </section>

    </>
  )
}
