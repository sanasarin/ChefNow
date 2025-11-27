import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import axios from "axios";
import { REGISTER_ENDPOINT } from "../config/constants";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function Register() {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorFieldValues, setErrorFieldValues] = useState({});

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    const updatedValues = {
      ...values,
      username: values.username.toLowerCase(),
      email: values.email.toLowerCase(),
    };

    try {
      await axios.post(REGISTER_ENDPOINT, updatedValues);
      setSuccessMessage("Registration successful! You can now log in.");
      setErrors({});
      setErrorFieldValues({});
      resetForm();
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.status === 400) {
        Object.entries(error.response.data).forEach(([key, value]) => {
          setFieldError(key, value[0]);
        });
      }
    }
  };

  return (
    <Container className="rounded-3" id="login-container">
      <Row>
        <Col></Col>
        <Col>
          <h1 className="fs-1">Create new account</h1>
          <p className="mb-4 f-secondary">
            Already a member?{" "}
            <span>
              <Link to="/login" className="link-primary link-primary-c ms-1">
                Log in
              </Link>
            </span>
          </p>

          {successMessage && (
            <Alert
              variant="success"
              onClose={() => setSuccessMessage("")}
              dismissible
            >
              Registration successful! You can now{" "}
              <Link to="/login" className="link-primary">
                log in
              </Link>
              .
            </Alert>
          )}

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, formikHelpers) =>
              handleSubmit(values, formikHelpers)
            }
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label
                    className="form-label f-secondary force-font"
                    htmlFor="username"
                  >
                    Enter Username
                  </label>
                  <br />
                  <Field
                    as={InputText}
                    id="username"
                    name="username"
                    required
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
                  <label
                    className="form-label f-secondary force-font"
                    htmlFor="email"
                  >
                    Enter Email
                  </label>
                  <br />
                  <Field
                    as={InputText}
                    id="email"
                    name="email"
                    required
                    className="normalize-input"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="small text-danger"
                  />
                </div>

                <div className="mb-3">
                  <label
                    className="form-label f-secondary force-font"
                    htmlFor="password"
                  >
                    Enter Password
                  </label>
                  <br />
                  <Field
                    as={Password}
                    id="password"
                    name="password"
                    required
                    className="edit-profile-form-input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="small text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="form-label f-secondary force-font"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <br />
                  <Field
                    as={Password}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="edit-profile-form-input"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="small text-danger"
                  />
                </div>

                <Button
                  type="submit"
                  label="Sign up"
                  id="login-btn"
                  disabled={isSubmitting}
                />
              </Form>
            )}
          </Formik>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default Register;
