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
  Spinner,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCartAction,
  addItemToCheckOutAction,
  toggleSelectStatus,
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
import ReactStars from "react-rating-stars-component";
import styles from "../../styles/Product.module.css";
const ProductDetails = ({ product }) => {
  const allReviewsForProduct = useSelector(
    (state) => state.reviewsReducer.reviews
  );
  const isLoading = useSelector((state) => state.cartReducer.isLoading);
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
    <Box p={20} mt={20} mb={10}>
      <Box className={styles.productDetailsContainer}>
        <Image
          className={styles.productDetailsImage}
          alt="product Image"
          src={product.imgUrl}
        ></Image>
        <Flex flexDirection="column" alignItems="center" textAlign="center">
          <Heading maxW={500} mb={3}>
            {product.title}
          </Heading>
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

          <ReactStars
            value={product.rating}
            isHalf={true}
            edit={false}
            size={24}
            activeColor="#ffd700"
          ></ReactStars>

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
                  dispatch(
                    toggleSelectStatus(product._id, userState?.result?.id, true)
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

          <Text maxW={400}>{product.description}</Text>
          <Box>
            {product.availableStock === 1 && (
              <Text color="red.600">Only 1 left in stock!</Text>
            )}
          </Box>
        </Flex>
      </Box>
      <Divider></Divider>
      <Box>
        <Heading mb={5}>Reviews</Heading>
        {isLoading && (
          <Flex gap={5}>
            <Text fontSize="2xl" fontWeight="bold">
              Loading...
            </Text>
            <Spinner ml={3} color="blue.600" size="md"></Spinner>
          </Flex>
        )}
        {!isLoading && allReviewsForProduct.length === 0 && (
          <Text color="red.600" mb={3}>
            This Product has no reviews, be the first to leave a review!
          </Text>
        )}
        {!isLoading &&
          allReviewsForProduct.length > 0 &&
          allReviewsForProduct.map((review) => (
            <Box
              key={review._id}
              borderWidth="2px"
              borderRadius={5}
              p={5}
              mb={3}
              bgColor="whitesmoke"
            >
              <Flex className={styles.reviewHeader}>
                <Flex>
                  <Box mr={4}>
                    <Avatar size="sm" name={review.username} />
                  </Box>
                  <Box>
                    <Text fontWeight="bold" fontSize="lg">
                      {review.username}
                    </Text>
                  </Box>
                </Flex>
                <Box>
                  <Text color="gray.700">
                    Commented on {review.createdAt.substring(0, 10)}
                  </Text>
                </Box>
              </Flex>

              <Text maxW="70%" mt={3}>
                {review.comment}
              </Text>

              <ReactStars
                value={review.rating}
                isHalf={true}
                edit={false}
                size={24}
                activeColor="#ffd700"
              ></ReactStars>
              {user && user?.result?.id === review.userId && (
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
                      dispatch(deleteReviewAction(review._id, product._id));
                    }}
                  >
                    <DeleteIcon></DeleteIcon>
                  </IconButton>
                </ButtonGroup>
              )}
            </Box>
          ))}
        <Box mr={4} ml={4}>
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
              <FormLabel fontWeight="bold">
                {isEditingReview ? "Editing" : "Write"} Review
              </FormLabel>
              <Textarea
                onChange={(e) => {
                  setReviewData({ ...reviewData, comment: e.target.value });
                }}
                required={true}
                value={reviewData.comment}
                placeholder="write your review*"
              ></Textarea>
              <Input
                required={true}
                value={reviewData.rating}
                type="number"
                placeholder="rate this product* [1->5]"
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
    </Box>
  );
};

export default ProductDetails;
