import React, { useContext } from "react";
import { Context } from "../Context";

export const Home = () => {
  const { randomData } = useContext(Context);

  console.log(randomData)
  return (
    <div>
      <h3>Welcome, {randomData}</h3>
    </div>
  );
};

export default Home;
