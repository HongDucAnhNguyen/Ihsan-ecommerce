import {
  Box,
  Button,
  Divider,
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
import { useEffect, useState } from "react";
import { createReviewAction } from "@/actions/reviewActions";
const ProductDetails = ({ product, userId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [reviewData, setReviewData] = useState({
    userId: userId,
    productId: product._id,
    rating: 4,
    comment: "",
  });
  useEffect(() => {
    console.log(userId, product._id);
  }, []);
  return (
    <Box>
      <Flex justifyContent="space-around" gap={4}>
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

      <Box>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            //dispatch createReview action
            dispatch(createReviewAction(reviewData));
            setReviewData({
              userId: userId,
              productId: product._id,
              rating: 4,
              comment: "",
            });
          }}
        >
          <FormLabel>Write a Review</FormLabel>
          <Textarea
            onChange={(e) => {
              setReviewData({ ...reviewData, comment: e.target.value });
            }}
            required={true}
            value={reviewData.comment}
            type="text"
            placeholder="write your review*"
          ></Textarea>
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProductDetails;
