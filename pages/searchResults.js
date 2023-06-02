import { Box, Heading, Text } from "@chakra-ui/react";
import styles from "../styles/Layout.module.css";
import { useSelector } from "react-redux";
const Contact = () => {
  const productSearchResults = useSelector(
    (state) => state.productReducer.searchResults
  );
  return (
    <div className={styles.container}>
      <Box>
        <Heading>Search Results</Heading>
        {productSearchResults.length > 0 &&
          productSearchResults.map((product) => (
            <Box key={product._id}>
              <Text>{product.title}</Text>
            </Box>
          ))}
      </Box>
    </div>
  );
};
export default Contact;
