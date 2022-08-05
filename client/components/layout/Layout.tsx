import { AppShell, Header, Navbar, Box, Anchor } from "@mantine/core";
import React from "react";
import { useStyles } from "./Layout.styles";

function Layout({ children }: { children: React.ReactNode }) {
  const { classes } = useStyles();

  return (
    <AppShell>
      <Header height={70}>
        <Navbar width={{ base: 300 }} p="xs">
          <Box>
            <Anchor>
              <img src="/logo.svg" alt="Mantine" />
            </Anchor>
          </Box>
        </Navbar>
      </Header>
      {children}
    </AppShell>
  );
}

export { Layout };
