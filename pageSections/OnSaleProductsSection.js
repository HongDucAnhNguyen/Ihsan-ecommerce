import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import styles from "../styles/Product.module.css";
import Products from "./components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOnSaleAction } from "@/actions/productsActions";
const OnSaleProductsSection = () => {
  const dispatch = useDispatch();
  const productsOnSale = useSelector(
    (state) => state.productReducer.productsOnSale
  );
  useEffect(() => {
    dispatch(getProductsOnSaleAction());
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        p: 5,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box maxW="100%" width={1200}>
        <Heading mb={4}>Products On Sale!</Heading>

        <Tabs>
          <TabList>
            <Tab>Quran</Tab>
            <Tab>Clothing</Tab>
            <Tab>Accessories</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Qurans</TabPanel>
            <TabPanel>Modest Clothing for Men and Women</TabPanel>
            <TabPanel>
              <Products products={productsOnSale}></Products>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <br />
      </Box>
    </Box>
  );
};

export default OnSaleProductsSection;
