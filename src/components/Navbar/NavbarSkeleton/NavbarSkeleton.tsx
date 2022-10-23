import { Navbar, Skeleton, Stack } from "@mantine/core";
import { NavbarLinks } from "../Navbar";
import { useStyles } from "../Navbar.styles";

function NavbarSkeleton({ data }: { data: NavbarLinks[] }) {
  const { classes } = useStyles();

  return (
    <Navbar className={classes.navbar} p={"sm"} width={{ base: 70, xl: 270 }}>
      <Navbar.Section grow mt="xl">
        <Stack align="center" className={classes.header} justify="center">
          <Skeleton className={classes.skeletonAvatar} />
          <Skeleton
            className={classes.skeletonUserInformation}
            height={25}
            radius="sm"
          />
          <Skeleton
            className={classes.skeletonUserInformation}
            height={25}
            radius="sm"
          />
        </Stack>
        {data.map((item) => (
          <Skeleton height={40} key={item.label} mt={10} />
        ))}
      </Navbar.Section>
      <Navbar.Section className={classes.footer}>
        <Navbar.Section>
          <Skeleton className={classes.skeletonNavBarLinks} />
        </Navbar.Section>
        <Navbar.Section>
          <Skeleton className={classes.skeletonNavBarLinks} mt={15} />
        </Navbar.Section>
      </Navbar.Section>
    </Navbar>
  );
}

export { NavbarSkeleton };
