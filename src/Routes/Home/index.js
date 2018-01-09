import React from "react";
import { getMsg } from "../../msgs";

function Home(props) {
  const { account: { lang } } = props;
  return (
    <div>
      <h1>{getMsg(lang, "home")}</h1>
    </div>
  );
}

export default Home;
