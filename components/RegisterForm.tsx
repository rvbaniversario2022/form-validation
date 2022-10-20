import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "cookies";

import { RegisterTypes } from "../types";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Loader from "./Loader";

const FormContainer = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 0.25rem;
  max-width: 450px;
  margin: 4rem auto 6rem;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
`;

const FormEl = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormLink = styled.a`
  cursor: pointer;
  margin: 1rem 0 0;
  color: gray;
  &:hover {
    color: #333;
  }
`;

interface Props {}

function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const toggleConfirmPassword = () => {
  //   setShowConfirmPassword(!showConfirmPassword);
  // };

  const PwRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  const phoneRegex = /^(09)\d{9}$/;

  const formik = useFormik({
    initialValues: userData,
    onSubmit: async (userData) => {
      try {
        await axios.post("api/register", userData);
        router.replace("/");
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .trim()
        .required("Username is required")
        .max(10, "Username must not exceed 10 characters")
        .min(4, "Username should not be less than 4"),
      password: yup
        .string()
        .required("Password is required")
        .max(15, "Password must not exceed 15 characters")
        .min(6, "Password should not be less than 6 characters")
        .matches(
          PwRegex,
          "Password should contain at least 1 uppercase, a lowercase, a special character, and a number."
        ),
      confirmPassword: yup
        .string()
        .required("Confirm password")
        .oneOf([yup.ref("password"), null], "Password does not match"),
      firstName: yup.string().required("First name is required"),
      middleName: yup.string(),
      lastName: yup.string().required("Lastname is required"),
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
      phone: yup
        .string()
        .matches(
          phoneRegex,
          "Phone must start with 0 and must have an 11-digit number"
        )
        .required("Phone is required"),
    }),
  });

  const togglePassword = () => {
    if (formik.values.password) {
      setShowPassword(!showPassword);
    }
    return;
  };

  const toggleConfirmPassword = () => {
    if (formik.values.confirmPassword) {
      setShowConfirmPassword(!showConfirmPassword);
    }
    return;
  };

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath &&
      setTimeout(() => {
        setLoading(false);
      }, 10000);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleStart);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleStart);
    };
  });

  return (
    <>
      {loading && <Loader />}
      <FormContainer>
        {/* Input */}
        <Title>Register</Title>
        <FormEl onSubmit={formik.handleSubmit}>
          <FormControl margin={"normal"} hiddenLabel={true}>
            <InputLabel focused={false} htmlFor="username">
              Username
            </InputLabel>
            <Input
              id="username"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
            />
            <FormHelperText error={true}>
              {formik.touched.username && formik.errors.username}
            </FormHelperText>
          </FormControl>

          {/* Input */}
          <FormControl margin={"normal"}>
            <InputLabel focused={false} htmlFor="firstname">
              First Name
            </InputLabel>
            <Input
              id="firstname"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstName && !!formik.errors.firstName}
            />
            <FormHelperText error={true}>
              {formik.touched.firstName && formik.errors.firstName}
            </FormHelperText>
          </FormControl>
          {/* Input */}
          <FormControl margin={"normal"}>
            <InputLabel focused={false} htmlFor="middleName">
              Middle Name
            </InputLabel>
            <Input
              id="middleName"
              type="text"
              name="middleName"
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.middleName && !!formik.errors.middleName}
            />
            <FormHelperText error={true}>
              {formik.touched.middleName && formik.errors.middleName}
            </FormHelperText>
          </FormControl>
          {/* Input */}
          <FormControl margin={"normal"}>
            <InputLabel focused={false} htmlFor="lastName">
              Last Name
            </InputLabel>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastName && !!formik.errors.lastName}
            />
            <FormHelperText error={true}>
              {formik.touched.lastName && formik.errors.lastName}
            </FormHelperText>
          </FormControl>
          {/* Input */}
          <FormControl margin={"normal"}>
            <InputLabel focused={false} htmlFor="email">
              Email
            </InputLabel>
            <Input
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
            />
            <FormHelperText error={true}>
              {formik.touched.email && formik.errors.email}
            </FormHelperText>
          </FormControl>
          {/* Input */}
          <FormControl margin={"normal"}>
            <InputLabel focused={false} htmlFor="phone">
              Phone
            </InputLabel>
            <Input
              id="phone"
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phone && !!formik.errors.phone}
            />
            <FormHelperText error={true}>
              {formik.touched.phone && formik.errors.phone}
            </FormHelperText>
          </FormControl>
          {/* Input */}
          <FormControl margin={"normal"}>
            <InputLabel focused={false} htmlFor="password">
              Password
            </InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={true}>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>
          {/* Input */}
          <FormControl margin={"normal"}>
            <InputLabel focused={false} htmlFor="confirmPass">
              Confirm Password
            </InputLabel>
            <Input
              id="confirmPass"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText error={true}>
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </FormHelperText>
          </FormControl>

          <Button variant="contained" sx={{ marginTop: 3 }} type="submit">
            Register
          </Button>
          <Link href="/login">
            <FormLink>Go back to login</FormLink>
          </Link>
        </FormEl>
      </FormContainer>
    </>
  );
}

export default RegisterForm;
