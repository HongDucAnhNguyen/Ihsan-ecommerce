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
    userId: userState?.result?.id,
    username: userState?.result?.username,
    productId: product._id,
    rating: "",
    comment: "",
  });

  const [isEditingReview, setIsEditingReview] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState("");
  useEffect(() => {
    dispatch(getReviewsAction(product._id));
  }, [allReviewsForProduct]);
  useEffect(() => {
    setReviewData({
      ...reviewData,
      userId: userState?.result?.id,
      username: userState?.result?.username,
    });
  }, [userState]);
  const clearReviewData = () => {
    setReviewData({
      userId: userState?.result?.id,
      username: userState?.result?.username,
      productId: product._id,
      rating: "",
      comment: "",
    });
  };
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
              dispatch(
                addItemToCheckOutAction(product._id, userState?.result?.id)
              );
              dispatch(
                addItemToCartAction(product._id, userState?.result?.id, toast)
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
          <Text>{product.description}</Text>
        </Flex>
      </Flex>

      <Box>
        <Heading>Reviews</Heading>
        {allReviewsForProduct.length > 0 ? (
          allReviewsForProduct.map((review) => (
            <Box key={review._id} p={5} border="2px solid orange">
              <Flex>
                <Avatar></Avatar>
                <Text>{review.username}</Text>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            //dispatch createReview action
            if (isEditingReview) {
              dispatch(updateReviewAction(currentReviewId, reviewData));
            } else dispatch(createReviewAction(reviewData, toast));

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
      </Box>
    </Box>
  );
};

export default ProductDetails;
