import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import styles from "../styles/Layout.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
const searchResults = () => {
  const productSearchResults = useSelector(
    (state) => state.productReducer.searchResults
  );
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setSearchResults(productSearchResults);
  }, [productSearchResults]);
  return (
    <div className={styles.container}>
      <Box>
        <Heading>Search Results</Heading>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <Flex
              key={product._id}
              p={4}
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
export default searchResults;
