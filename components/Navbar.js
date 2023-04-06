import NextLink from "next/link";
import { Avatar, Icon, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const handleNavbarStickyOnScroll = () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > navbar.offsetTop) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleNavbarStickyOnScroll);
    return () =>
      window.removeEventListener("scroll", handleNavbarStickyOnScroll);
  }, []);
  return (
    <nav
      className={isScrolling ? styles.navbarSticky : styles.navbar}
      id="navbar"
    >
      <div className={styles.storeNavItems}>
        <Link
          as={NextLink}
          href="/"
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          Logo
        </Link>
        <Link
          as={NextLink}
          href="/Quran"
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          Qur'an
        </Link>

        <Menu
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Modest Clothing
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link width={"100%"} as={NextLink} href="/clothing/men">
                Men
              </Link>
            </MenuItem>
            <MenuItem>
              {" "}
              <Link width={"100%"} as={NextLink} href="/clothing/women">
                Women
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <Link
          as={NextLink}
          href="/accessories"
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          Accessories
        </Link>
        <Link
          as={NextLink}
          href="/about"
          style={{
            padding: 10,
            fontWeight: "bold",
          }}
        >
          About
        </Link>
      </div>
      <div className={styles.actionNavItems}>
        <NextLink
          href="/account"
          style={{
            color: "whitesmoke",
            backgroundColor: "#ebb434",
            padding: 10,
            fontWeight: "bold",
          }}
        >
          <Avatar size="xs"></Avatar> Account
        </NextLink>
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
      </div>
    </nav>
  );
};

export default Navbar;
