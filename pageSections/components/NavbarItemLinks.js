import NextLink from "next/link";
import {
  Button,
  Link,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Box,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const NavbarItemLinks = () => {
  return (
    <Box>
      
      <Link
        mr={2}
        as={NextLink}
        href="/Quran"
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
          p: 2,
          fontWeight: "bold",
        }}
      >
        Qur'an
      </Link>

      <Menu
        sx={{
          p: 4,
          fontWeight: "bold",
        }}
      >
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Clothing
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link
              mr={2}
              sx={{
                "&:hover": {
                  textDecoration: "none",
                },
              }}
              width={"100%"}
              as={NextLink}
              href="/clothing/mclothing"
            >
              Men
            </Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link
              mr={2}
              sx={{
                "&:hover": {
                  textDecoration: "none",
                },
              }}
              width={"100%"}
              as={NextLink}
              href="/clothing/fclothing"
            >
              Women
            </Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link
              mr={2}
              sx={{
                "&:hover": {
                  textDecoration: "none",
                },
              }}
              width={"100%"}
              as={NextLink}
              href="/clothing"
            >
              All
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>

      <Link
        mr={2}
        as={NextLink}
        href="/accessories"
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
          p: 2,
          fontWeight: "bold",
        }}
      >
        Accessories
      </Link>
      <Link
        mr={2}
        as={NextLink}
        href="/about"
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
          p: 2,
          fontWeight: "bold",
        }}
      >
        About
      </Link>
    </Box>
  );
};

export default NavbarItemLinks;
