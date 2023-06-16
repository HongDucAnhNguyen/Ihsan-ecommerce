import React from "react";
import NextLink from "next/link";
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
  Input,
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
  ChevronDownIcon,
  SearchIcon,
  InfoOutlineIcon,
  StarIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import AuthForm from "./AuthForm";
import { searchProductsAction } from "@/actions/productsActions";
import { useRouter } from "next/router";
const NavbarActionLinks = ({
  user,
  onOpen,
  onClose,
  isOpen,
  isSearching,

  setIsSearching,
  searchQuery,
  setSearchQuery,
  hamburgerNav,
}) => {
  const router = useRouter();
  return (
    <Box sx={hamburgerNav && { display: "flex", flexDirection: "column" }}>
      {!hamburgerNav && (
        <Button
          mr={4}
          onClick={() => {
            setIsSearching(true);
            onOpen();
          }}
        >
          <SearchIcon></SearchIcon>
        </Button>
      )}

      {hamburgerNav ? (
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
                {user ? (
                  <Text
                    onClick={() => {
                      setIsSearching(false), onOpen();
                    }}
                    _hover={{ color: "blue.600" }}
                    cursor="pointer"
                  >
                    {user?.result?.username}{" "}
                    <InfoOutlineIcon ml={3}></InfoOutlineIcon>
                  </Text>
                ) : (
                  "Log In/Register"
                )}
              </Box>
              <Box mb={3}>
                {" "}
                <Link
                  _hover={hamburgerNav && { color: "blue.600" }}
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
                  _hover={hamburgerNav && { color: "blue.600" }}
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
      ) : (
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
                    ml={hamburgerNav ? 2 : ""}
                    _hover={hamburgerNav && { color: "blue.600" }}
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
                    ml={hamburgerNav ? 2 : ""}
                    _hover={hamburgerNav && { color: "blue.600" }}
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
      )}

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
        ml={hamburgerNav ? 2 : ""}
        _hover={hamburgerNav && { color: "blue.600" }}
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
          ml={hamburgerNav ? 2 : ""}
          _hover={hamburgerNav && { color: "blue.600" }}
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

      {hamburgerNav && (
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
  );
};

export default NavbarActionLinks;
