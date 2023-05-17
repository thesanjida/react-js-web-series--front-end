import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import service from "../../Hooks/service";
import useAuth from "../../Hooks/useAuth";
import { MutatingDots } from "react-loader-spinner";
import { toast } from "react-hot-toast";

// const initialState = {
//   loading: false,
//   error: "",
//   spinner: "",
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "SUCCESS":
//       return {
//         loading: false,
//         spinner: action.result,
//         error: "",
//       };
//     case "ERROR":
//       return {
//         loading: false,
//         spinner: "",
//         error: "There was a problem",
//       };
//     default: {
//       return state;
//     }
//   }
// };

const Login = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState([]);
  let navigate = useNavigate();
  const { user } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: response } = await service.post("/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.TokenData);
      // .then((ma) => {
      //   dispatch({
      //     type: "SUCCESS",
      //     result: ma.data,
      //   });
      // })
      // .catch(() => {
      //   dispatch({
      //     type: "ERROR",
      //   });
      // });
      setResp(response);
      if (response == "Please provide valid credentials") {
        return toast("Please provide valid credentials");
      } else {
        toast("Login successful, redirect");
        navigate("/dashboard");
      }
    } catch (error) {
      setResp(error);
    }
  };

  if (user === undefined)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <MutatingDots
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  if (!!user && user.Role === "VideoManager")
    navigate(`/dashboard/manage/videos`);
  if (!!user && user.Role === "Admin") navigate(`/users`);

  //if (user === null) navigate(`/login`);

  return (
    <div className="login">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="login_form d-flex flex-column align-items-center">
          <div className="">
            <h3>Login</h3>
          </div>
          <Form onSubmit={handleLoginSubmit} className="mt-3 mb-3 w-100">
            <div className="text-center" style={{ color: "red" }}></div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              onClick={handleLoginSubmit}
              className="w-100"
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
          <div className="mt-1">
            New on our platform?{" "}
            <Link className="linkText" to="/singup">
              Create an account
            </Link>
          </div>
          <div className="m-2">
            <span>OR</span>
          </div>
          <div className="">
            <Link className="linkText" to="/">
              Goto Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
