import { createStyles } from "@mantine/core";
import { getButtonLabelColor, getHoverButtonLabelColor } from "../../utils/mantine";

const useStyles = createStyles((theme,  _params, getRef) => {
  const icon = getRef("icon");

  return {

    header: {
      height: "70px",
      backgroundColor:
      theme.colorScheme === "light"
      ? theme.colors.gray[0]
      : theme.colors.dark[7],
      alignSelf: "stretch",
      justifyContent: "space-between",
      padding: theme.spacing.xl * 1.5,
    },
    
    icon: {
      color: getButtonLabelColor(theme),

      "&:hover": {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        [`& .${icon}`]: {
          color: getHoverButtonLabelColor(theme),
        },
      },
    }
  }
}
)

  export { useStyles };
  