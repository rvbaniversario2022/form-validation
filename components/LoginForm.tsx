import React from "react";
import styled from "styled-components";
import { Formik, useFormik } from "formik";
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
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { LoginTypes } from "../types";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { useCookies } from "react-cookie";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import Loader from "./Loader";

const FormContainer = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 0.25rem;
  max-width: 350px;
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

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (userData) => {
      const getRes = await axios.get(
        "https://634cd1c5f5d2cc648e952d73.mockapi.io/users"
      );
      const data = getRes.data;
      const result = data.filter((user: LoginTypes) => {
        if (
          user.username === userData.username &&
          user.password === userData.password
        ) {
          return user;
        }
      });

      if (result.length === 0) {
        console.log("User does not exist");
      } else {
        await axios.post("api/login", userData);
        router.replace("/");
      }
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      password: yup.string().required("Password is required"),
    }),
  });

  const togglePassword = () => {
    if (formik.values.password) {
      setShowPassword(!showPassword);
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
        <Title>Login</Title>
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
                formik.values.password && (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }
            />
            <FormHelperText error={true}>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>

          <Button variant="contained" sx={{ marginTop: 3 }} type="submit">
            Login
          </Button>
          <Link href="/register">
            <FormLink>Create Account</FormLink>
          </Link>
        </FormEl>
      </FormContainer>
    </>
  );
};

export default LoginForm;
