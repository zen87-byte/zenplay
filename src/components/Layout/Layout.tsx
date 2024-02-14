// Layout.jsx

import Head from "next/head";
import Navbar from "../Navbar/Navbar";
import React, { Suspense } from "react";
import { ThemeProvider } from "../../context/ThemeProvider";
import Loading from "../Loading/Loading";
import Footer from "@components/footer/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      {/* <AuthProvider> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <Suspense fallback={<Loading />}>
            <div className="relative min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow ">{children}</main>
              <div>
              <Footer />
              </div>
            </div>
          </Suspense>
        </ThemeProvider>
      {/* </AuthProvider> */}
    </>
  );
}
