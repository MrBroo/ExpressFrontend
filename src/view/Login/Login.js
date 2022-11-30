import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import { useCallback, useState } from "react";
import { SIGN_IN } from "../../services/authServices";
function Login() {
  const [inputValues, setInputValues] = useState({
    password: null,
    username: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const userData = await SIGN_IN(inputValues);

    if (userData) {
      localStorage.setItem("token", userData.token);
      localStorage.setItem("id", userData._id);
      console.log(userData.token);
      navigate("/list");
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setInputValues((state) => ({ ...state, [name]: value }));
  }, []);

  return (
    <div className="login">
      <div className="login__inner">
        <div className="login__inner__left">
          <h1>Welcome back</h1>
          <p>Please enter your details</p>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 40,
            }}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item
              label={"Username"}
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                type="text"
                size="large"
                name="username"
                placeholder="Enter your username"
                value={inputValues.username}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              label={"Password"}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                type="password"
                size="large"
                name="password"
                placeholder="Enter your password"
                value={inputValues.password}
                onChange={handleInputChange}
              />
            </Form.Item>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </Form>

          <div className="login__inner__left__register">
            <p>Don't have an account?</p>{" "}
            <Link to="/">
              <span>Sign up</span>
            </Link>
          </div>
        </div>
        <div className="login__inner__right"></div>
      </div>
    </div>
  );
}
export default Login;
