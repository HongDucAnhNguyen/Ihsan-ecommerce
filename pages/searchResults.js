import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import styles from "../styles/Layout.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
const SearchResults = () => {
  const productSearchResults = useSelector(
    (state) => state.productReducer.searchResults
  );
  const isLoading = useSelector((state) => state.cartReducer.isLoading);

  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setSearchResults(productSearchResults);
  }, [productSearchResults]);
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Box mt={20} p={30}>
          <Heading>Search Results</Heading>
          <Flex gap={5}>
            <Text fontSize="2xl" fontWeight="bold">
              Loading...
            </Text>
            <Spinner ml={3} color="blue.600" size="md"></Spinner>
          </Flex>
        </Box>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Box mt={20} p={30}>
        <Heading>Search Results</Heading>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <Flex
              mt={5}
              mb={5}
              key={product._id}
              p={4}
              borderRadius={10}
              border="3px solid lightblue"
              justifyContent="space-between"
            >
              <Text maxW="50%">{product.title}</Text>
              <IconButton
                onClick={() => {
                  router.push({
                    pathname: "/details",
                    query: {
                      productId: product._id,
                    },
                  });
                }}
              >
                <ExternalLinkIcon></ExternalLinkIcon>
              </IconButton>
            </Flex>
          ))
        ) : (
          <Text>Sorry, no matches found</Text>
        )}
      </Box>
    </div>
  );
};
export default SearchResults;
