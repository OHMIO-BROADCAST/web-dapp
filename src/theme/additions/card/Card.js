const Card = {
  baseStyle: {
    p: "22px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "20px",
    position: "relative",
    wordWrap: "break-word",
    backgroundClip: "border-box",
    background: "rgba(255, 255, 255, 0.2)",
  },
  variants: {
    panel: (props) => ({
      bg: props.colorMode === "dark" ? "#111C44" : "111C44",
    }),
  },
  defaultProps: {
    variant: "panel",
  },
};

export const CardComponent = {
  components: {
    Card,
  },
};
