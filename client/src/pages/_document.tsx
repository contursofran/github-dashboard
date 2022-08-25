import { resetServerContext } from "@hello-pangea/dnd";
import { createGetInitialProps } from "@mantine/next";
import { Head, Html, Main, NextScript } from "next/document";

function Document() {
  resetServerContext();
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = createGetInitialProps();

export default Document;
