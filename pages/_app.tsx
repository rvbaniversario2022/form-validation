import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  // const [submitted, setSubmitted] = useState(false);
  // const [open, setOpen] = useState(false);

  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  // };
  return (
    <div className="main__container">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
