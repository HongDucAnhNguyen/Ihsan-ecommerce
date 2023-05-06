import {
  Box,
  
  Heading,
 
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Products from "./components/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getFeaturedProductsAction } from "@/actions/productsActions";
const FeaturedProductsSection = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector(
    (state) => state.productReducer.products
  );
  useEffect(() => {
    dispatch(getFeaturedProductsAction());
  }, []);
  return (
    <Box sx={{ padding: 5 }}>
      <Heading>Featured Products</Heading>
      <br />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          overflowX: "auto",
        }}
      >
        <Products products={featuredProducts}></Products>
        {/* <Card minW="sm">
          <CardHeader className={styles.cardHeader}>
            <IconButton bg="beige">
              <StarIcon></StarIcon>
            </IconButton>
          </CardHeader>
          <Box className={styles.productImgContainer}>
            <Image
              className={styles.cardImg}
              borderRadius="lg"
              src="https://www.kindpng.com/picc/m/270-2709961_light-burgundy-data-rimg-lazy-data-rimg-scale.png"
              alt="Light Burgundy Hijab"
            />
          </Box>

          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">Light Burgundy Hijab</Heading>
              <Text>Light Silk Burgundy color Hijab</Text>
              <Text color="blue.600" fontSize="1xl">
                $32
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

        <Card minW="sm">
          <CardHeader className={styles.cardHeader}>
            <IconButton bg="beige">
              <StarIcon></StarIcon>
            </IconButton>
          </CardHeader>
          <Box className={styles.productImgContainer}>
            <Image
              className={styles.cardImg}
              borderRadius="lg"
              src="https://www.kindpng.com/picc/m/204-2047627_64797-tajweed-quran-double-mosque-size-hd-png.png"
              alt="The noble Quran"
            />
          </Box>

          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">The Noble Qur'an</Heading>
              <Text>The Noble Qur'an with Tajweed and color code</Text>
              <Text color="blue.600" fontSize="1xl">
                $32
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

        <Card minW="sm">
          <CardHeader className={styles.cardHeader}>
            <IconButton bg="beige">
              <StarIcon></StarIcon>
            </IconButton>
          </CardHeader>
          <Box className={styles.productImgContainer}>
            <Image
              className={styles.cardImg}
              borderRadius="lg"
              src="https://www.kindpng.com/picc/m/204-2047344_al-quran-mualim-tajweed-tajweedi-quran-lines-quran.png"
              alt="The Wise Quran"
            />
          </Box>

          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">The Wise Qur'an</Heading>
              <Text>The Wise Qur'an with Tajweed and color code</Text>
              <Text color="blue.600" fontSize="1xl">
                $32
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
      */}
      </Box>
    </Box>
  );
};

export default FeaturedProductsSection;
