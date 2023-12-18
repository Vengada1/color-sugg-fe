import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUser,
  faEnvelope,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Added state for login/register toggle
  const navigate = useNavigate();

  const validateLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await AxiosService.post("/login", {
        email,
        password,
      });
      if (res.status === 200) {
        toast.success("Login Successful");
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("id", res.data.id);
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occurred! Please try after some time"
      );
    }
  };

  const validateSignUp = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (res.status === 201) {
        toast.success("User Created Successfully, Click on Login");
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occurred! Please try after some time"
      );
    }
  };

  const validateReset = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Enter Email Id first");
      } else {
        let res = await AxiosService.post("/forgetPassword", {
          email,
        });
        console.log(res);
        if (res.status === 200) {
          navigate("/resetPassword");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form fields if needed
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <>
      <div className="home">
        <div className="form-box">
          <div className="button-box">
            <Button className="toggle-btn" onClick={toggleForm}>
              {isLogin ? "Login" : "Register"}
            </Button>
          </div>
          <div className="container d-flex flex-row">
            <Form className="input-group" id={isLogin ? "signin" : "register"}>
              {/* ... (unchanged) */}
            </Form>
            <Form className="input-group" id={isLogin ? "register" : "signin"}>
              {/* ... (unchanged) */}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
