import { HomeComponent } from "@/client/components/Home";
import { NextPage } from "next";
import { Fragment } from "react";

const Home: NextPage = () => {
  return (
    <Fragment>
      <HomeComponent />
    </Fragment>
  );
};

export default Home;
