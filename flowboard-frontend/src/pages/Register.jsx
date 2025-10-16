import "./styles/login.css";
import { useState } from "react";
import api from "../api/axios";

function Register() {
  const shapes = [
    {
      size: 20,
      color: "bg-red-400",
      top: "top-[10%]",
      left: "left-[15%]",
      delay: "0s",
    },
    {
      size: 15,
      color: "bg-yellow-400",
      top: "top-[70%]",
      left: "left-[10%]",
      delay: "2s",
    },
    {
      size: 25,
      color: "bg-yellow-300",
      top: "top-[50%]",
      left: "left-[75%]",
      delay: "1s",
    },
    {
      size: 12,
      color: "bg-teal-400",
      top: "top-[80%]",
      left: "left-[80%]",
      delay: "3s",
    },
    {
      size: 22,
      color: "bg-pink-300",
      top: "top-[15%]",
      left: "left-[70%]",
      delay: "4s",
    },
  ];
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    privacyChecked: false,
  });
  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const [error, setError] = useState({
    isError: false,
    errorText: "",
  });
  const displayErrorMessage = (message) => {
    setError({
      isError: true,
      errorText: message,
    });
    setTimeout(() => {
      setError({
        isError: false,
        errorText: "",
      });
    }, 3000);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if(!formData.email||!formData.username||!formData.password||!formData.confirmPassword){
        displayErrorMessage("Please enter data in all fields!");
    }
    else if(formData.password!==formData.confirmPassword){
        displayErrorMessage("Passwords do not match!");
    }
    else if(!formData.privacyChecked){
        displayErrorMessage("You must agree to the Privacy Policy and Terms & Conditions before proceeding.");
    }
    try{
        const response = await api.post('/auth/register',{
            username: formData.username,
            email: formData.email,
            password: formData.password
        });
        console.log(response.status,response.data.message);
        if(response.status!==201){
            displayErrorMessage(response.data.message);
        }
    }
    catch(err){
        console.log(err);
        displayErrorMessage(err.response.data.message);
    }
  };
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
      <div className="relative flex flex-col justify-center items-center">
        <div className="relative z-10">
          <h1 className="text-cyan-500 mb-8 text-5xl font-bold login-title">
            FlowBoard
          </h1>
        </div>
        <div className="relative z-10 bg-zinc-800 p-12 rounded-2xl shadow-2xl w-100 text-center">
          <h1 className="text-white mb-8 text-3xl font-semibold">Sign Up!</h1>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              required
              onChange={handleChange}
              className="p-3 rounded-lg border border-cyan-700 focus:border-cyan-600 focus:ring focus:ring-cyan-300 outline-none text-white"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-lg border border-cyan-700 focus:border-cyan-600 focus:ring focus:ring-cyan-300 outline-none text-white"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formData.pass}
              onChange={handleChange}
              className="p-3 rounded-lg border border-cyan-700 focus:border-cyan-600 focus:ring focus:ring-cyan-300 outline-none text-white"
            />
            <input
              type="password"
              placeholder="Retype Password"
              required
              name="confirmPassword"
              value={formData.confirmPass}
              onChange={handleChange}
              className="p-3 rounded-lg border border-cyan-700 focus:border-cyan-600 focus:ring focus:ring-cyan-300 outline-none text-white"
            />
            <label className="flex items-center text-sm text-gray-300">
              <input
                type="checkbox"
                name="privacyChecked"
                onChange={handleChange}
                checked={formData.privacyChecked}
                className="mr-2 accent-cyan-400"
              />
              <span className="text-start">
                I agree to the
                <a
                  href="/privacy-policy"
                  className="text-cyan-400 hover:underline ml-1"
                >
                  Privacy Policy{" "}
                </a>
                and agree to the
                <a
                  href="/terms-and-conditions"
                  className="text-cyan-400 hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </span>
            </label>
            <button
              type="submit"
              onClick={submitHandler}
              className="p-3 rounded-lg bg-cyan-700 text-white font-bold hover:bg-blue-900 transition"
            >
              Log In
            </button>
            <p
              className={
                error.isError ? "opacity-100 text-red-600 text-md" : "opacity-0"
              }
            >
              {error.errorText}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
