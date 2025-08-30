import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login = () => {
const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ذخیره در localStorage
    localStorage.setItem('Login', username);

    Swal.fire({
      title: "Successful!",
      icon: "success",
      draggable: true,
    });
    navigate('/chat');
  };

  return (
    <form className="h-screen bg-slate-900 flex items-center justify-center p-4" onSubmit={handleSubmit}>
      <div className="w-full max-w-md bg-amber-50 rounded-xl shadow-lg p-6">
        <div className="text-center text-slate-900 text-3xl font-bold mb-6">
          LOG IN
        </div>
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-400 block w-full h-12 rounded-md px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-slate-900"
       value={username}
       onChange={(e)=>setUsername(e.target.value)}
       />
        <button
          className="w-full h-12 rounded-md bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          type="submit"
        >
          LOG IN
        </button>
      </div>
    </form>
  );
};


export default Login;