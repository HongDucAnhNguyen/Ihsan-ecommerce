import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Product from "./Product";
import { useDispatch } from "react-redux";
import { addItemToCartAction } from "@/actions/cartActions";
import { useRouter } from "next/router";
const ProductDetails = ({ product, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Box p={5}>
      <Flex justifyContent="space-evenly" gap={4}>
        <Image src={product.imgUrl} maxWidth="50%"></Image>
        <Flex flexDirection="column" alignItems="center" textAlign="center">
          <Heading mb={3}>{product.title}</Heading>
          <Flex gap={3} mb={4}>
            <Text
              color="blue.600"
              fontSize="2xl"
              sx={{ textDecorationLine: product.isOnSale && "line-through" }}
            >
              ${product.price}
            </Text>
            {product.isOnSale && (
              <Text color="blue.600" fontSize="3xl" fontWeight="bold">
                ${product.salePrice}
              </Text>
            )}
          </Flex>
          <Button
            width="50%"
            onClick={() => {
              dispatch(addItemToCartAction(product._id, userId));
              router.push("/cart");
            }}
            _hover={{ bg: "black" }}
            bg="blackAlpha.700"
            color="whitesmoke"
            mb={4}
          >
            Add to Cart
          </Button>
          <Text>{product.description}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductDetails;
