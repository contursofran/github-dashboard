import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import { Layout } from "../components/layout/Layout";
import styles from "../styles/Home.module.css";

const Home = () => {
  return <div>Test</div>;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
