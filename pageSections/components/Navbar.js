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
  Menu,
  MenuItem,
  MenuButton,
  Button,
  MenuList,
  Avatar,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Icon,
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
import { searchProductsAction } from "@/actions/productsActions";

import NavbarItemLinksResponsive from "./NavbarItemLinksResponsive";
import NavbarActionLinksResponsive from "./NavbarActionLinksResponsive";
const Navbar = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState(null);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

 

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

    const checkInterval = setInterval(checkSession, 3600000);

    window.addEventListener("scroll", handleNavbarStickyOnScroll);

    return () => {
      window.removeEventListener("scroll", handleNavbarStickyOnScroll);

      clearInterval(checkInterval);
    };
  }, []);

  useEffect(() => {
    setUser(userState);
    userState !== null && dispatch(getItemsInCartAction(userState?.result?.id));
  }, [userState]);

  return (
    <nav
      className={`${styles.navbar} ${isScrolling && styles.navbarSticky} `}
      id="navbar"
    >
      <Flex alignItems="center">
        <Link
          // className={styles.logoResponsive}
          mr={5}
          mb={1}
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
          }}
        >
          Ihsan
        </Link>

        <Box className={styles.navbarItemLinks}>
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
      </Flex>

      <Box className={styles.navbarActionLinks}>
        <Button
          mr={4}
          onClick={() => {
            setIsSearching(true);
            onOpen();
          }}
        >
          <SearchIcon></SearchIcon>
        </Button>

        <Menu>
          <MenuButton
            onClick={() => {
              setIsSearching(false);
            }}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            <Avatar
              name={user ? user?.result?.username : ""}
              size="xs"
            ></Avatar>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>
              {user ? (
                <>
                  {user?.result?.username}{" "}
                  <InfoOutlineIcon ml={3}></InfoOutlineIcon>
                </>
              ) : (
                "Log In/Register"
              )}
            </MenuItem>
            {user && (
              <>
                <MenuItem>
                  {" "}
                  <Link
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
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link
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
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>

        <Modal
          blockScrollOnMount={false}
          isCentered={true}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            {isSearching ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(searchProductsAction(searchQuery));
                  setSearchQuery("");
                  onClose();
                  router.push("/searchResults");
                }}
              >
                <Input
                  size="lg"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  type="text"
                  required
                  placeholder="Search Store..."
                ></Input>
              </form>
            ) : (
              <>
                <ModalCloseButton />
                <AuthForm></AuthForm>
              </>
            )}
          </ModalContent>
        </Modal>

        <Link
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
          onClick={() => {
            router.push("/cart");
          }}
          rightIcon={<Icon fontSize="xl" as={AiOutlineShopping}></Icon>}
        >
          Cart
        </Button>
      </Box>

      <div className={styles.hamburgerNavbar}>
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
              <NavbarItemLinksResponsive></NavbarItemLinksResponsive>
              <NavbarActionLinksResponsive
                user={user}
                onOpen={onOpen}
                setIsSearching={setIsSearching}
              ></NavbarActionLinksResponsive>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
