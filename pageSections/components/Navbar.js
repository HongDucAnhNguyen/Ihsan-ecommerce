import NextLink from "next/link";

import React, { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import {
  Link,
  Modal,
  useDisclosure,
  Input,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Flex,
  Box,
  Heading,
  Divider,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";
import {
  ChevronDownIcon,
  SearchIcon,
  InfoOutlineIcon,
  StarIcon,
  SettingsIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { decode } from "jsonwebtoken";
import { logoutAction } from "@/actions/authActions";
import { useRouter } from "next/router";
import { getItemsInCartAction } from "@/actions/cartActions";

import NavbarItemLinks from "./NavbarItemLinks";
import NavbarActionLinks from "./NavbarActionLinks";
const Navbar = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [user, setUser] = useState(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hamburgerNav, setHamburgerNav] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: "",
    height: "",
  });
  const handleResize = () => {
    setWindowSize({
      width: (window.innerWidth * 95) / 100,
      height: window.innerHeight,
    });
  };

  const handleNavbarStickyOnScroll = () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > navbar.offsetHeight * 2) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };
  const [isSearching, setIsSearching] = useState(false);
  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/getToken");
      const data = await response.json();
      if (data) {
        const decodedToken = decode(data);

        if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(logoutAction());
          sessionAlert();
        }
      }
    } catch (error) {
      console.log("something went wrong");
    }
  };

  const sessionAlert = () => {
    toast({
      position: "bottom-left",
      title: "Logged Out.",
      description: "Session Ended, automatically logged out",
      duration: 5000,
      isClosable: true,
    });
  };
  const openHamburgerMenu = () => {
    setIsHamburgerOpen(true);
  };
  const closeHamburgerMenu = () => {
    setIsHamburgerOpen(false);
  };
  useEffect(() => {
    checkSession();
    if (window.innerWidth < 900) {
      setHamburgerNav(true);
    } else setHamburgerNav(false);
    setWindowSize({
      width: window.innerWidth,
    });
    const checkInterval = setInterval(checkSession, 3600000);

    window.addEventListener("scroll", handleNavbarStickyOnScroll);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);

      window.removeEventListener("scroll", handleNavbarStickyOnScroll);

      clearInterval(checkInterval);
    };
  }, []);

  useEffect(() => {
    console.log(windowSize.width);
    if (windowSize.width < 900) {
      setHamburgerNav(true);
    } else setHamburgerNav(false);
  }, [windowSize]);
  useEffect(() => {
    setUser(userState);
    userState !== null && dispatch(getItemsInCartAction(userState?.result?.id));
  }, [userState]);

  return (
    <nav
      className={`${styles.navbar} ${isScrolling && styles.navbarSticky} `}
      id="navbar"
    >
      <Flex>
        <Box>
          <Link
            mr={2}
            as={NextLink}
            href="/"
            sx={{
              "&:hover": {
                textDecoration: "none",
              },
              p: 2,
              fontWeight: "bold",
              fontSize: "2xl",
              fontStyle: "italic",
              marginRight: 10,
            }}
          >
            Ihsan
          </Link>
        </Box>

        {!hamburgerNav && <NavbarItemLinks></NavbarItemLinks>}
      </Flex>

      {!hamburgerNav && (
        <NavbarActionLinks
          user={user}
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        ></NavbarActionLinks>
      )}
      {hamburgerNav && (
        <div>
          <IconButton size="lg" onClick={openHamburgerMenu}>
            <HamburgerIcon></HamburgerIcon>
          </IconButton>
          <Drawer
            blockScrollOnMount={false}
            size="xs"
            zIndex={999999999}
            isOpen={isHamburgerOpen}
            placement="right"
            onClose={closeHamburgerMenu}
          >
            <DrawerOverlay />

            <DrawerContent>
              <DrawerHeader>
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading fontStyle="italic" color="blue.600">
                    Ihsan
                  </Heading>
                  <CloseButton onClick={closeHamburgerMenu}></CloseButton>
                </Flex>
              </DrawerHeader>
              <Divider></Divider>
              <DrawerBody>
                <NavbarItemLinks hamburgerNav={hamburgerNav}></NavbarItemLinks>
                <NavbarActionLinks
                  user={user}
                  onOpen={onOpen}
                  onClose={onClose}
                  isOpen={isOpen}
                  isSearching={isSearching}
                  setIsSearching={setIsSearching}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  hamburgerNav={hamburgerNav}
                ></NavbarActionLinks>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
