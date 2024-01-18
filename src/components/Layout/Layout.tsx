import Head from "next/head";
import Navbar from "../Navbar/Navbar";
import React, { Suspense } from "react";
import { ThemeProvider } from "../theme-provider";
import Loading from "../Loading/Loading";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title />
        <meta
          name="description"
          content="Watch best and popular movie for free"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <Suspense fallback={<Loading />}>
          <div className="m-auto">
            <Navbar />
            <main>{children}</main>
          </div>
        </Suspense>
      </ThemeProvider>
    </>
  );
}
