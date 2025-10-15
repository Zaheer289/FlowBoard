import './styles/login.css'
import { useState } from 'react';
function Login() {
  const shapes = [
    { size: 20, color: 'bg-red-400', top: 'top-[10%]', left: 'left-[15%]', delay: '0s' },
    { size: 15, color: 'bg-yellow-400', top: 'top-[70%]', left: 'left-[10%]', delay: '2s' },
    { size: 25, color: 'bg-yellow-300', top: 'top-[50%]', left: 'left-[75%]', delay: '1s' },
    { size: 12, color: 'bg-teal-400', top: 'top-[80%]', left: 'left-[80%]', delay: '3s' },
    { size: 22, color: 'bg-pink-300', top: 'top-[15%]', left: 'left-[70%]', delay: '4s' },
  ];
  const [formData, setFormData] = useState({
      email: "",
      password: "",
    })
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const submitHandler = (event) => {
        event.preventDefault();
        console.log(formData);
    }

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-neutral-950 to-neutral-800 overflow-hidden m-0">

      <div className="absolute inset-0 pointer-events-none z-0 grid-background"></div>


      {shapes.map((shape, idx) => (
        <div
          key={idx}
          className={`absolute rounded-lg opacity-80 z-0 ${shape.color} ${shape.top} ${shape.left}`}
          style={{
            width: `${shape.size * 4}px`,
            height: `${shape.size * 4}px`,
            animation: `float 8s ease-in-out infinite alternate`,
            animationDelay: shape.delay,
          }}
        ></div>
      ))}

      {/* Login Card */}
      <div className='relative flex flex-col justify-center items-center'>
        <div className='relative z-10'>
            <h1 className="text-cyan-500 mb-8 text-5xl font-bold login-title">FlowBoard</h1>
        </div>
      <div className="relative z-10 bg-zinc-800 p-12 rounded-2xl shadow-2xl w-100 text-center">
        <h1 className="text-white mb-8 text-3xl font-semibold">Welcome Back!</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-cyan-700 focus:border-cyan-600 focus:ring focus:ring-cyan-300 outline-none text-white"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-cyan-700 focus:border-cyan-600 focus:ring focus:ring-cyan-300 outline-none text-white"
          />
          <button
            type="submit"
            className="p-3 rounded-lg bg-cyan-700 text-white font-bold hover:bg-blue-900 transition"
            onClick={submitHandler}
          >
            Log In
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Login;