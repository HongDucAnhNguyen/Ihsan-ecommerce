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
import React, { useEffect, useState } from "react";
import styles from "../styles/Product.module.css";
import Products from "./components/Products";
import { useDispatch, useSelector } from "react-redux";
import { getProductsOnSaleAction } from "@/actions/productsActions";
const OnSaleProductsSection = () => {
  const dispatch = useDispatch();
  const productsOnSale = useSelector(
    (state) => state.productReducer.productsOnSale
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (index) => {
    setSelectedTab(index);
  };
  useEffect(() => {
    switch (selectedTab) {
      case 0:
        dispatch(getProductsOnSaleAction("Quran"));
        break;
      case 1:
        dispatch(getProductsOnSaleAction("clothing"));
        break;
      case 2:
        dispatch(getProductsOnSaleAction("accessories"));
        break;
      default:
        break;
    }
  }, [selectedTab]);

  return (
    <>
      <Heading mb={4}>Products On Sale!</Heading>
      <Tabs onChange={handleTabChange} index={selectedTab}>
        <TabList>
          <Tab>Quran</Tab>
          <Tab>Clothing</Tab>
          <Tab>Accessories</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Products products={productsOnSale}></Products>
          </TabPanel>
          <TabPanel>
            <Products products={productsOnSale}></Products>
          </TabPanel>
          <TabPanel>
            <Products products={productsOnSale}></Products>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default OnSaleProductsSection;
