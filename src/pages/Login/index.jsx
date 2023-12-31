import { useNavigate, Link } from "react-router-dom";
import { useContext, useRef } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");
  const { login } = useContext(AuthContext);

  const loginSubmit = async () => {
    let payload = {
      email: email.current.value,
      password: password.current.value,
    };
    console.log(payload);

    try {
      await login(payload);
      Swal.fire({ icon: "success", title: "Success!" });
      navigate("/");
    } catch (error) {
      let message = error.response?.data || error.message;
      Swal.fire({ icon: "error", title: "Error!", text: message });
    }
  };

  return (
    <div className="m-auto pt-20 max-w-[600px] h-full">
      <div>
        <h1 className="loginHeading">Login</h1>
        <div>
          <input
            type="email"
            className="loginInput"
            placeholder="Email"
            ref={email}
          />
          <input
            type="password"
            className="loginInput"
            placeholder="Password"
            ref={password}
          />
          <div className="flex justify-between font-extralight mt-2">
            <span>Forget password?</span>
            <span>
              <Link to="/register">Registration</Link>
            </span>
          </div>
          <button className="loginButton" onClick={loginSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
