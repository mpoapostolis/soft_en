import React from "react";
import * as styles from "./css";
// here we import style

const Home = props => {
  const { container } = styles;
  return (
    <div className={container}>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
