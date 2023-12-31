import React, { useState, useContext } from "react";
import Head from "next/head";
import { Plus_Jakarta_Sans } from "@next/font/google";
const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function Layout({ children, pageProps }) {
  return (
    <>
      <Head>
        <title>One Percent Better</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={`${plus_jakarta_sans.className}`}>{children}</main>
    </>
  );
}
