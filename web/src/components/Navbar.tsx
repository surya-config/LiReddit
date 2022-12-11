import { Box, Flex, Link } from "@chakra-ui/layout";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";

function Navbar() {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2} color="white">
            Login
          </Link>
        </NextLink>

        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Text mr={4} fontSize="xl" color="white">
          {data.me.username}
        </Text>

        <Button
          variant="link"
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Text fontSize="2xl" color="white">
        LiReddit
      </Text>

      <Box ml="auto">{body}</Box>
    </Flex>
  );
}

export default Navbar;
