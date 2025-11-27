import React, { useContext, useRef } from "react";
import AccountContext from "../../contexts/AccountContext";
import axios from "axios";
import CustomCard from "../shared/CustomCard";
import { ACCOUNT_ENDPOINT } from "../../config/constants";
import ProfilePictureUpload from "./ProfilePictureUpload";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button as PrimeButton } from "primereact/button";
import { Toast } from "primereact/toast";
import useAuthToken from "../../hooks/useAuthToken";

const ProfileSchema = Yup.object().shape({
  first_name: Yup.string().matches(
    /^[A-Za-z\s]+$/,
    "First Name can only contain letters and spaces"
  ),
  last_name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Last Name can only contain letters and spaces")
    .test(
      "last_name_required_when_first_name_present",
      "Last Name is required with First Name",
      function (value) {
        const { first_name } = this.parent;
        return first_name ? !!value : true;
      }
    ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone_number: Yup.string().matches(
    /^(\+\d{1,2}\s?)?(\d{1,4}[\s-]?)?(\d{1,4}[\s-]?){2}\d{1,4}$/,
    "Invalid Phone Number"
  ),
});

function ProfileDetailsCard() {
  const { account, setAccount } = useContext(AccountContext);
  const toast = useRef(null);
  useAuthToken();

  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    try {
      const response = await axios.patch(ACCOUNT_ENDPOINT, values);
      toast.current.show({
        severity: "success",
        summary: "Profile updated successfully!",
        life: 3000,
      });
      setAccount(response.data);
      resetForm({
        values: {
          first_name: response.data.first_name || "",
          last_name: response.data.last_name || "",
          email: response.data.email || "",
          phone_number: response.data.phone_number || "",
        },
      }); // Reset the form with the new values
    } catch (error) {
      if (error.response && error.response.data) {
        for (const [field, errorMessage] of Object.entries(
          error.response.data
        )) {
          setFieldError(field, errorMessage[0]);
        }
      } else {
        toast.current.show({
          severity: "error",
          summary: "An unexpected error occurred. Please try again.",
          life: 3000,
        });
      }
      console.log(error);
    }
    setSubmitting(false);
  };

  return (
    <CustomCard title={`Profile`}>
      <Toast ref={toast} />
      <ProfilePictureUpload account={account} setAccount={setAccount} />

      <Formik
        initialValues={{
          first_name: account.first_name || "",
          last_name: account.last_name || "",
          email: account.email || "",
          phone_number: account.phone_number || "",
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, formik) => handleSubmit(values, formik)}
      >
        {({ status, dirty }) => (
          <Form className="row mt-4">
            <div className="col-md-6 mt-4">
              <label className="form-label" htmlFor="first_name">
                First Name
              </label>
              <Field
                as={InputText}
                name="first_name"
                className="normalize-input"
                placeholder="Enter your first name"
                autoComplete="off"
              />
              <ErrorMessage
                name="first_name"
                component="small"
                className="text-danger"
              />
            </div>

            <div className="col-md-6 mt-4">
              <label className="form-label" htmlFor="last_name">
                Last Name
              </label>
              <Field
                as={InputText}
                name="last_name"
                className="normalize-input"
                placeholder="Enter your last name"
                autoComplete="off"
              />
              <ErrorMessage
                name="last_name"
                component="small"
                className="text-danger"
              />
            </div>

            <div className="col-md-6 mt-4">
              <label className="form-label" htmlFor="email">
                Email Address
              </label>
              <Field
                as={InputText}
                name="email"
                className="normalize-input"
                placeholder="Enter your email"
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component="small"
                className="text-danger"
              />
            </div>

            <div className="col-md-6 mt-4">
              <label className="form-label" htmlFor="phone_number">
                Phone Number
              </label>
              <Field
                as={InputText}
                name="phone_number"
                className="normalize-input"
                placeholder="Enter your phone number"
                autoComplete="off"
              />
              <ErrorMessage
                name="phone_number"
                component="small"
                className="text-danger"
              />
            </div>

            <div className="col-12 text-end">
              <PrimeButton
                type="submit"
                label="Save"
                className="mb-0 mt-4 mb-4"
                disabled={!dirty}
              />
            </div>
          </Form>
        )}
      </Formik>
    </CustomCard>
  );
}

export default ProfileDetailsCard;
