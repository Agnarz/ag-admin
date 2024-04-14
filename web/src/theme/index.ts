import { Input, createTheme } from "@mantine/core";
import underlineInput from "../input.module.css";
export const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "xs",
  focusRing: "never",
  components: {
    Input: Input.extend({ classNames: underlineInput }),
    Text: {
      styles: {
        root: { color: "#c1c2c5" },
      },
    },
    Slider: {
      styles: {
        marksContainer: { color: "#c1c2c5" },
        markWrapper: { color: "#c1c2c5" },
      },
    },
    Modal: {
      styles: {
        title: { fontWeight: "bold" },
      },
    },
    Popover: {
      styles: {
        dropdown: {
          zIndex: 10000,
        },
      },
    },
    Table: {
      styles: {
        thead: { background: "var(--mantine-color-dark-8)", zIndex: 1 },
        tfoot: { background: "var(--mantine-color-dark-8)", zIndex: 1 },
        table: { background: "var(--mantine-color-dark-7)" },
      },
    },
  },
});
// Customizations
// https://mantine.dev/theming/customization
// https://mantine.dev/theming/theming-context
// https://mantine.dev/theming/color-scheme

