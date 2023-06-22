import NextLink from "next/link";
import {
  Button,
  Link,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import styles from "../../styles/Navbar.module.css";
const NavbarItemLinksResponsive = () => {
  return (
    <Box className={styles.navbarItemLinksResponsive}>
      <Link
        _hover={{
          color: "blue.600",
          transition: "all .3s ease-in-out",
        }}
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

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text fontWeight="bold">Clothing</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box mb={3}>
              <Link
                _hover={{
                  color: "blue.600",
                  transition: "all .5s ease-in-out",
                }}
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
                Men's Clothing
              </Link>
            </Box>
            <Box mb={3}>
              <Link
                _hover={{
                  color: "blue.600",
                  transition: "all .5s ease-in-out",
                }}
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
                Women's Clothing
              </Link>
            </Box>
            <Box mb={3}>
              <Link
                _hover={{
                  color: "blue.600",
                  transition: "all .5s ease-in-out",
                }}
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
                All Clothing
              </Link>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Link
        _hover={{
          color: "blue.600",
          transition: "all .5s ease-in-out",
        }}
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
        _hover={{
          color: "blue.600",
          transition: "all .5s ease-in-out",
        }}
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

export default NavbarItemLinksResponsive;
