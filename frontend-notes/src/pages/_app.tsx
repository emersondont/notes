import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/context/appContext";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  )
}
