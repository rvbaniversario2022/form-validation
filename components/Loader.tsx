import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Loader = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
    </div>
  );
};

export default Loader;
