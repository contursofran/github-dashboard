import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ReactElement, ReactNode } from "react";
import superjson from "superjson";
import { AppRouter } from "../server/createRouter";

export type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

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
          /** Put your mantine theme override here */
          colorScheme: "dark",

          fontFamily: "Poppins, Roboto",
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
