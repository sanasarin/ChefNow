import { useState, useContext } from "react";
import AccountContext from "../contexts/AccountContext";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../styles/login.css";
import axios from "axios";
import { LOGIN_ENDPOINT } from "../config/constants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button as PrimeButton } from "primereact/button";
import { Message } from "primereact/message";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const { login } = useContext(AccountContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    const updatedValues = {
      ...values,
      username: values.username.toLowerCase(),
    };

    try {
      const response = await axios.post(LOGIN_ENDPOINT, updatedValues);
      login(response.data.token);
      navigate("/"); // Redirect to the desired page after successful login
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div className="container rounded-3" id="login-container">
      <Row>
        <Col></Col>
        <Col>
          <h1 className="fs-1">Welcome back</h1>
          <p className="mb-4 f-secondary">
            New here?{" "}
            <span>
              <Link to="/register" className="link-primary link-primary-c ms-1">
                Create an account
              </Link>
            </span>
          </p>
          {/* <Alert variant="danger">{errors.non_field_errors[0]}</Alert> */}

          {errors.non_field_errors && (
            <Message
              severity="error"
              text="Invalid username or password."
              id="loginError"
              className="mb-4"
            />
          )}

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, formikHelpers) =>
              handleSubmit(values, formikHelpers)
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="f-secondary form-label" htmlFor="username">
                    Username
                  </label>
                  <Field
                    as={InputText}
                    id="loginUsername"
                    name="username"
                    className="normalize-input"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="small text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label className="f-secondary form-label" htmlFor="password">
                    Password
                  </label>
                  <Field
                    as={InputText}
                    type="password"
                    id="loginPassword"
                    name="password"
                    className="normalize-input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="small text-danger"
                  />
                </div>

                <PrimeButton
                  type="submit"
                  label="Login"
                  id="login-btn"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
}

export default Login;
