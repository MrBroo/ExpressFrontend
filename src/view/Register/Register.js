import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { SIGN_UP } from "../../services/authServices";
import { Form, Input } from "antd";

function Register() {
  const [inputValues, setInputValues] = useState({
    password: null,
    username: "",
    email: "",
  });

  const history = useNavigate();

  const handleSubmit = async () => {
    const userData = await SIGN_UP(inputValues);
    if (userData) {
      history("/login");
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setInputValues((state) => ({ ...state, [name]: value }));
  }, []);

  return (
    <>
      <div className="register">
        <div className="register__inner">
          <div className="register__inner__left"></div>
          <div className="register__inner__right">
            <h1>Registration</h1>
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
                label={"Email"}
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  size="large"
                  name="email"
                  placeholder="Enter your email"
                  value={inputValues.email}
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
              <Form.Item>
                <button type="submit" onClick={handleSubmit}>
                  Sign Up
                </button>
              </Form.Item>
            </Form>
            <div className="register__inner__right__login">
              <p>Do you have an account?</p>
              <Link to="/login">
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
