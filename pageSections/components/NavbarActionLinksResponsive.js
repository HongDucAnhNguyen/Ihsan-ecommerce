import React from "react";
import NextLink from "next/link";
import {
 
  Button,
  Icon,
  Link,
  
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";
import {
 
  SearchIcon,
  InfoOutlineIcon,
  StarIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styles from "../../styles/Navbar.module.css";
const NavbarActionLinksResponsive = ({
  user,
  onOpen,
  
  setIsSearching,
  
}) => {
  const router = useRouter();
  
  return (
    <Box className={styles.navbarActionLinksResponsive}>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Text fontWeight="bold">Account Settings</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box mb={3}>
              <Text
                onClick={() => {
                  setIsSearching(false), onOpen();
                }}
                _hover={{ color: "blue.600" }}
                cursor="pointer"
              >
                {user ? user?.result?.username : "Log In/Register"}
                {user && <InfoOutlineIcon ml={3}></InfoOutlineIcon>}
              </Text>
            </Box>
            <Box mb={3}>
              {" "}
              <Link
                _hover={{ color: "blue.600" }}
                mr={2}
                width={"100%"}
                sx={{
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
                as={NextLink}
                href="/account"
              >
                Account <SettingsIcon ml={3}></SettingsIcon>
              </Link>
            </Box>
            <Box mb={3}>
              <Link
                _hover={{ color: "blue.600" }}
                mr={2}
                width={"100%"}
                sx={{
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
                as={NextLink}
                href="/wishlist"
              >
                Wish List <StarIcon ml={3}></StarIcon>
              </Link>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Link
        ml={2}
        _hover={{ color: "blue.600" }}
        mr={2}
        as={NextLink}
        href="/contact"
        sx={{
          "&:hover": {
            textDecoration: "none",
          },
          p: 2,
          fontWeight: "bold",
        }}
      >
        Contact
      </Link>

      {user && user?.result?.role === "admin" ? (
        <Link
          ml={2}
          _hover={{ color: "blue.600" }}
          mr={2}
          as={NextLink}
          href="/admin"
          sx={{
            "&:hover": {
              textDecoration: "none",
            },
            p: 2,
            fontWeight: "bold",
          }}
        >
          Admin
        </Link>
      ) : (
        <></>
      )}

      <Button
        mb={4}
        onClick={() => {
          setIsSearching(true);
          onOpen();
        }}
      >
        <Text mr={4}>Search The Store</Text>
        <SearchIcon></SearchIcon>
      </Button>

      <Button
        onClick={() => {
          router.push("/cart");
        }}
        rightIcon={<Icon fontSize="xl" as={AiOutlineShopping}></Icon>}
      >
        Cart
      </Button>
    </Box>
  );
};

export default NavbarActionLinksResponsive;
