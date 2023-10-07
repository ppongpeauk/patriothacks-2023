import {
  defineStyle,
  defineStyleConfig,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const subtitle = defineStyle({
  color: "gray.500",
  _dark: {
    color: "gray.400",
  },
});

export const textTheme = defineStyleConfig({
  variants: { subtitle },
  sizes: {
    "5xl": {
      fontSize: "2xl",
      lineHeight: "3xl",
    },
  },
});

const theme = extendTheme({
  components: {
    Text: textTheme,
    Link: {
      baseStyle: {
        textUnderlineOffset: 4,
        _hover: {
          opacity: 0.87,
        },
        _active: {
          opacity: 0.75,
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: "body",
      },
    },
  },

  fonts: {
    heading: "var(--font-familjen)",
    body: "var(--font-familjen)",
  },
  config,
});

export default theme;
