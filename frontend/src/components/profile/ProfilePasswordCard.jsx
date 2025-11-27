import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomCard from "../shared/CustomCard";
import axios from "axios";
import useAuthToken from "../../hooks/useAuthToken";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Row } from "react-bootstrap";
import "../../styles/forms.css";
import AccountContext from "../../contexts/AccountContext";
import { LOGIN_ENDPOINT, ACCOUNT_ENDPOINT } from "../../config/constants";

/*
  Its currently displaying frontend validation.
  But im also handling backend validation messages.
  Although, to test, you need to disable frontend validation.
*/

// Validation schema
const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      "Password must contain at least one letter and one number"
    )
    .notOneOf(
      [Yup.ref("account.username"), null],
      "Password must not be the same as the username"
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function ProfilePasswordCard() {
  const { account } = useContext(AccountContext);
  useAuthToken();
  const toast = React.useRef(null);
  useAuthToken();

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    try {
      // Check if the current password is correct
      const loginResponse = await axios.post(LOGIN_ENDPOINT, {
        username: account.username,
        password: values.currentPassword,
      });

      // Update the password
      const response = await axios.patch(ACCOUNT_ENDPOINT, {
        password: values.password,
      });
      toast.current.show({
        severity: "success",
        summary: "Password Changed",
        detail: "Your password has been changed successfully!",
        life: 2000,
      });
      resetForm();
    } catch (error) {
      console.error(error.response);
      if (error.response.data.password != null) {
        setFieldError("password", error.response.data.password[0]);
      } else {
        setFieldError(
          "currentPassword",
          "The password you entered is incorrect."
        );
      }
    }
    setSubmitting(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <CustomCard title="Change Password">
        <Formik
          initialValues={{
            currentPassword: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={PasswordChangeSchema}
          onSubmit={(values, formikHelpers) =>
            handleSubmit(values, formikHelpers)
          }
        >
          {({ isSubmitting }) => (
            <Form>
              <Row>
                <div className="col-md-12">
                  <label className="form-label" htmlFor="currentPassword">
                    Current Password
                  </label>{" "}
                  <br />
                  <Field
                    as={Password}
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Current Password"
                    className="edit-profile-form-input"
                    feedback={false}
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="small text-danger"
                  />
                </div>
              </Row>
              <Row>
                <div className="col-md-12 mt-4">
                  <label className="form-label" htmlFor="password">
                    New Password
                  </label>{" "}
                  <br />
                  <Field
                    as={Password}
                    id="password"
                    name="password"
                    placeholder="New Password"
                    className="edit-profile-form-input"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="small text-danger"
                  />
                </div>
              </Row>
              <Row>
                <div className="col-md-12 mt-4">
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>{" "}
                  <br />
                  <Field
                    as={Password}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="edit-profile-form-input"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="small text-danger"
                  />
                </div>
              </Row>
              <Button
                type="submit"
                label="Change Password"
                disabled={isSubmitting}
                className="float-end mt-4 mb-4"
              />
            </Form>
          )}
        </Formik>
      </CustomCard>
    </>
  );
}

export default ProfilePasswordCard;
