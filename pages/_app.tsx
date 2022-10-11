import { MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect } from "react";
import superjson from "superjson";
import { AppRouter } from "../server/createRouter";
import { useStore } from "../store";

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const colorScheme = useStore((state) => state.colorScheme);
  const preferredColorScheme = useColorScheme();
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    if (window.localStorage.getItem("colorScheme")) {
      useStore.setState({
        colorScheme: window.localStorage.getItem("colorScheme") as
          | "light"
          | "dark"
          | "system",
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            blue: [
              "#e7f5ff",
              "#d0ebff",
              "#a5d8ff",
              "#8ccafa",
              "#67bafa",
              "#339af0",
              "#228be6",
              "#2684ad",
              "#02617e",
              "#0e3144",
            ],
          },
          colorScheme:
            colorScheme === "system" ? preferredColorScheme : colorScheme,
          fontFamily: "Poppins, Roboto",
          headings: { fontFamily: "Poppins, Roboto" },
        }}
      >
        <NotificationsProvider>
          <SessionProvider session={pageProps.session}>
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  // reference for vercel.com
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // reference for render.com
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    const links = [
      loggerLink(),
      httpBatchLink({
        url,
      }),
    ];

    return {
      url: `${getBaseUrl()}/api/trpc`,

      links,
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            useErrorBoundary: true,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      },
    };
  },
  ssr: false, // we set it to false to be able to see the request in the network tab
})(App);
