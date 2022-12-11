import { Box } from "@chakra-ui/layout";

interface WrapperProps {
  variant?: "small" | "regular";
  children?: JSX.Element;
}

const Wrapper = ({ children, variant = "regular" }: WrapperProps) => {
  return (
    <Box
      mt={8}
      mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
