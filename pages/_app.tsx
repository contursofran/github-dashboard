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
import { blue, indigo, orange, violet } from "../styles/colors";

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const colorScheme = useStore((state) => state.colorScheme);
  const accentColor = useStore((state) => state.accentColor);
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

    if (window.localStorage.getItem("accentColor")) {
      useStore.setState({
        accentColor: window.localStorage.getItem("accentColor") as
          | "blue"
          | "indigo"
          | "orange"
          | "violet",
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
          // prettier-ignore
          colors: {
            blue: [blue[0], blue[1], blue[2], blue[3], blue[4], blue[5], blue[6], blue[7], blue[8], blue[9]],
            violet: [violet[0], violet[1], violet[2], violet[3], violet[4], violet[5], violet[6], violet[7], violet[8], violet[9]],
            indigo: [indigo[0], indigo[1], indigo[2], indigo[3], indigo[4], indigo[5], indigo[6], indigo[7], indigo[8], indigo[9]],
            orange: [orange[0], orange[1], orange[2], orange[3], orange[4], orange[5], orange[6], orange[7], orange[8], orange[9]],
          },
          primaryColor: accentColor,
          primaryShade: {
            light: 4,
            dark: 4,
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
