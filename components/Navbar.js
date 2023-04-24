import NextLink from "next/link";
import {
  Avatar,
  Button,
  Icon,
  Link,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import AuthForm from "./AuthForm";
import { useSelector } from "react-redux";
const Navbar = () => {
  // const [userPersist, setUserPersist] = useState(typeof window !== 'undefined' && localStorage.getItem('userPorf'));
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNavbarStickyOnScroll = () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > navbar.offsetTop) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  useEffect(() => {
    // console.log(userState);
    // const storedUser = localStorage.getItem("userProfile");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // } else {}
    setUser(userState);
    window.addEventListener("scroll", handleNavbarStickyOnScroll);
    return () =>
      window.removeEventListener("scroll", handleNavbarStickyOnScroll);
  }, [userState]);
  return (
    <nav
      className={`${styles.navbar} ${isScrolling ? styles.navbarSticky : ""}`}
      id="navbar"
    >
      <div className={styles.storeNavItems}>
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
          Logo
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
            Modest Clothing
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
                href="/clothing/men"
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
                href="/clothing/women"
              >
                Women
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
      <div className={styles.actionNavItems}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar size="xs"></Avatar>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>
              {user ? user?.result?.username : "Log In"}
            </MenuItem>
            {user && (
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
                  Account
                </Link>
              </MenuItem>
            )}
          </MenuList>
        </Menu>

        <Modal
          isCentered={true}
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <AuthForm></AuthForm>
          </ModalContent>
        </Modal>
        <NextLink
          href="/cart"
          style={{
            color: "whitesmoke",
            backgroundColor: "#ebb434",
            padding: 10,
            fontWeight: "bold",
          }}
        >
          <Icon as={MdOutlineAddShoppingCart}></Icon> Cart
        </NextLink>
        <NextLink
          href="/contact"
          style={{
            color: "whitesmoke",
            backgroundColor: "#ebb434",
            padding: 10,
            fontWeight: "bold",
            borderRadius: 4,
          }}
        >
          Contact
        </NextLink>
        {user && user?.result?.id === "6444b7e5c1115af830ba3746" ? (
          <NextLink
            href="/admin"
            style={{
              color: "whitesmoke",
              backgroundColor: "#ebb434",
              padding: 10,
              fontWeight: "bold",
              borderRadius: 4,
            }}
          >
            Admin
          </NextLink>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
