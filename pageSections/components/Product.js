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
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import styles from "../../styles/Product.module.css";
const Product = ({ product }) => {
 
  return (
    <Card minW="sm">
      <CardHeader className={styles.cardHeader}>
        <IconButton
          bg="beige"
          onClick={() => {
            console.log("you liked this item");
          }}
        >
          <StarIcon></StarIcon>
        </IconButton>
      </CardHeader>
      <Box className={styles.productImgContainer}>
        <Image
          className={styles.cardImg}
          borderRadius="lg"
          src={product.imgUrl}
          alt={product.title}
        />
      </Box>

      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">{product.title}</Heading>
          <Text>{product.description}</Text>
          <Text color="blue.600" fontSize="1xl">
            ${product.price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing={2}>
          <Button variant="solid" colorScheme="blue">
            Buy Now
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to Cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Product;
