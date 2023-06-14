import NextLink from "next/link";

import React, { useEffect, useState } from "react";
import styles from "../../styles/Navbar.module.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  Avatar,
  Button,
  Icon,
  Link,
  Modal,
  useDisclosure,
  Input,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineShopping } from "react-icons/ai";
import {
  ChevronDownIcon,
  SearchIcon,
  InfoOutlineIcon,
  StarIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { decode } from "jsonwebtoken";
import { logoutAction } from "@/actions/authActions";
import { useRouter } from "next/router";
import { getItemsInCartAction } from "@/actions/cartActions";
import { searchProductsAction } from "@/actions/productsActions";
const Navbar = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [user, setUser] = useState(null);
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
    console.log(isSearching);
  }, [isSearching]);
  useEffect(() => {
    setUser(userState);
    userState !== null && dispatch(getItemsInCartAction(userState?.result?.id));
  }, [userState]);
  return (
    <nav
      className={`${styles.navbar} ${isScrolling && styles.navbarSticky} `}
      id="navbar"
    >
      <div>
        <Link
          as={NextLink}
          href="/"
          sx={{
            "&:hover": {
              textDecoration: "none",
            },
            p: 2,
            fontWeight: "bold",
          }}
        >
          Ihsan
        </Link>
        <Link
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
      </div>
      <div>
        <IconButton
          mr={4}
          onClick={() => {
            setIsSearching(true);
            onOpen();
          }}
        >
          <SearchIcon></SearchIcon>
        </IconButton>

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
      </div>
    </nav>
  );
};

export default Navbar;
