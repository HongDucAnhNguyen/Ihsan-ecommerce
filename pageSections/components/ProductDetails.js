import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCartAction,
  addItemToCheckOutAction,
} from "@/actions/cartActions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  createReviewAction,
  deleteReviewAction,
  getReviewsAction,
  updateReviewAction,
} from "@/actions/reviewActions";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
const ProductDetails = ({ product }) => {
  const allReviewsForProduct = useSelector(
    (state) => state.reviewsReducer.reviews
  );
  const userState = useSelector((state) => state.authReducer.authData);
  const toast = useToast();
  const dispatch = useDispatch();
  const router = useRouter();
  const [reviewData, setReviewData] = useState({
    userId: "",
    username: "",
    productId: "",
    rating: "",
    comment: "",
  });

  const [isEditingReview, setIsEditingReview] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    dispatch(getReviewsAction(product._id));
  }, [dispatch]);
  useEffect(() => {
    setUser(userState);
  }, [userState]);
  const clearReviewData = () => {
    setReviewData({
      userId: "",
      username: "",
      productId: "",
      rating: "",
      comment: "",
    });
  };
  return (
    <Box>
      <Flex justifyContent="space-around" gap={4}>
        <Image minW="sm" src={product.imgUrl} maxWidth="md"></Image>
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
              <Text color="orange.600" fontSize="3xl" fontWeight="bold">
                ${product.salePrice}
              </Text>
            )}
          </Flex>
          {user ? (
            product.availableStock === 0 ? (
              <Tag fontSize="lg" variant="solid" size="lg" colorScheme="red">
                SOLD OUT
              </Tag>
            ) : (
              <Button
                width="50%"
                onClick={() => {
                  dispatch(
                    addItemToCheckOutAction(product._id, userState?.result?.id)
                  );
                  dispatch(
                    addItemToCartAction(
                      product._id,
                      userState?.result?.id,
                      toast
                    )
                  );
                  router.push("/cart");
                }}
                _hover={{ bg: "black" }}
                bg="blackAlpha.700"
                color="whitesmoke"
                mb={4}
              >
                Add to Cart
              </Button>
            )
          ) : (
            <Text color="red.600">Sign in to interact with product</Text>
          )}

          <Text>{product.description}</Text>
          {product.availableStock === 1 && (
            <Text color="red.600">Only 1 left in stock!</Text>
          )}
        </Flex>
      </Flex>

      <Box>
        <Heading>Reviews</Heading>
        <Divider></Divider>
        {allReviewsForProduct.length > 0 ? (
          allReviewsForProduct.map((review) => (
            <Box key={review._id} p={5}>
              <Flex justifyContent="space-between">
                <Flex>
                  <Avatar></Avatar>
                  <Text>{review.username}</Text>
                </Flex>
                <Box>Commented on {review.createdAt.substring(0, 10)}</Box>
              </Flex>

              <p>{review.comment}</p>
              <p>Rating Given: {review.rating}</p>
              {userState?.result?.id === review.userId && (
                <ButtonGroup>
                  <IconButton
                    onClick={() => {
                      setReviewData(review);
                      setIsEditingReview(true);
                      setCurrentReviewId(review._id);
                    }}
                  >
                    <EditIcon></EditIcon>
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      clearReviewData();
                      setIsEditingReview(false);
                      setCurrentReviewId("");
                      dispatch(deleteReviewAction(review._id));
                    }}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </ButtonGroup>
              )}
            </Box>
          ))
        ) : (
          <Text>This Product has no reviews</Text>
        )}
        {user ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              //dispatch createReview action
              if (isEditingReview) {
                dispatch(
                  updateReviewAction(currentReviewId, {
                    ...reviewData,
                    userId: userState?.result?.id,
                    username: userState?.result?.username,
                    productId: product._id,
                  })
                );
              } else
                dispatch(
                  createReviewAction(
                    {
                      ...reviewData,
                      userId: userState?.result?.id,
                      username: userState?.result?.username,
                      productId: product._id,
                    },
                    toast
                  )
                );

              clearReviewData();
              setIsEditingReview(false);
              setCurrentReviewId("");
            }}
          >
            <FormLabel>
              {isEditingReview ? "Editing" : "Write"} a Review
            </FormLabel>
            <Input
              onChange={(e) => {
                setReviewData({ ...reviewData, comment: e.target.value });
              }}
              required={true}
              value={reviewData.comment}
              type="text"
              placeholder="write your review*"
            ></Input>
            <Input
              required={true}
              value={reviewData.rating}
              type="number"
              placeholder="rate this product*"
              onChange={(e) => {
                setReviewData({ ...reviewData, rating: e.target.value });
              }}
              min={1}
              max={5}
            ></Input>
            <Button type="submit">Submit</Button>
            {isEditingReview && (
              <Button
                onClick={() => {
                  setIsEditingReview(false);
                  setReviewData({
                    userId: userState?.result?.id,
                    username: userState?.result?.username,
                    productId: product._id,
                    rating: "",
                    comment: "",
                  });
                }}
              >
                Cancel
              </Button>
            )}
          </form>
        ) : (
          <Text color="red.600">Sign in to comment</Text>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetails;
