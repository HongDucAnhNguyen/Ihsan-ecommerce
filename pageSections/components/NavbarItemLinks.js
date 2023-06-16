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

const NavbarItemLinks = ({ hamburgerNav }) => {
  return (
    <Box sx={hamburgerNav && { display: "flex", flexDirection: "column" }}>
      <Link
        ml={hamburgerNav ? 2 : ""}
        _hover={
          hamburgerNav && {
            color: "blue.600",
            transition: "all .3s ease-in-out",
          }
        }
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
      {hamburgerNav ? (
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
                  _hover={
                    hamburgerNav && {
                      color: "blue.600",
                      transition: "all .5s ease-in-out",
                    }
                  }
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
                  _hover={
                    hamburgerNav && {
                      color: "blue.600",
                      transition: "all .5s ease-in-out",
                    }
                  }
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
                  _hover={
                    hamburgerNav && {
                      color: "blue.600",
                      transition: "all .5s ease-in-out",
                    }
                  }
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
      ) : (
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
                ml={hamburgerNav ? 2 : ""}
                _hover={
                  hamburgerNav && {
                    color: "blue.600",
                    transition: "all .5s ease-in-out",
                  }
                }
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
                ml={hamburgerNav ? 2 : ""}
                _hover={
                  hamburgerNav && {
                    color: "blue.600",
                    transition: "all .5s ease-in-out",
                  }
                }
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
                ml={hamburgerNav ? 2 : ""}
                _hover={
                  hamburgerNav && {
                    color: "blue.600",
                    transition: "all .5s ease-in-out",
                  }
                }
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
      )}

      <Link
        ml={hamburgerNav ? 2 : ""}
        _hover={
          hamburgerNav && {
            color: "blue.600",
            transition: "all .5s ease-in-out",
          }
        }
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
        ml={hamburgerNav ? 2 : ""}
        _hover={
          hamburgerNav && {
            color: "blue.600",
            transition: "all .5s ease-in-out",
          }
        }
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
