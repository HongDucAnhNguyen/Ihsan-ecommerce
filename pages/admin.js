import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Layout.module.css";
import { useState, useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Flex,
  Heading,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  createProductAction,
  deleteProductAction,
  getAllProductsAction,
  updateProductAction,
} from "@/actions/productsActions";
// import Products from "@/pageSections/components/Products";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { adminAuthorizeAction } from "@/actions/authActions";
//add password checker to authorize access to content of adminpage
import { useDisclosure } from "@chakra-ui/react";
import {
  removeItemFromCheckOutAction,
  removeItemInCartAction,
} from "../actions/cartActions";
const Admin = () => {
  const authorizedStatus = useSelector(
    (state) => state.authReducer.isAuthorizedAsAdmin
  );
  const userState = useSelector((state) => state.authReducer.authData);
  const allProducts = useSelector((state) => state.productReducer.products);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [adminCreds, setAdminCreds] = useState({ username: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [productFormData, setProductFormData] = useState({
    imgUrl: "",
    category: "",
    title: "",
    description: "",
    price: "",
    salePrice: "",
    isFeatured: false,
    isOnSale: false,
    // clothingSizes: [],
    maxQuantityPerPurchase: "",
    availableStock: "",
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const clearForm = () => {
    setProductFormData({
      imgUrl: "",
      category: "",
      title: "",
      description: "",
      price: "",
      isFeatured: false,
      isOnSale: false,
      salePrice: "",
      clothingSizes: [],
      maxQuantityPerPurchase: "",
      availableStock: "",
    });
  };
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  useEffect(() => {
    setIsAuthorized(authorizedStatus);
  }, [authorizedStatus]);
  useEffect(() => {
    setUser(userState);
  }, [userState]);
  useEffect(() => {
    onOpen();
  }, []);
  if (!user) {
    return (
      <div className={styles.container}>
        <Heading>Unauthorized</Heading>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {isAuthorized ? (
        <Box maxW="lg" mt={10}>
          <Heading mb={5}>Inventory Management</Heading>
          {allProducts.length > 0 ? (
            <Box maxH="lg" overflow="auto">
              {allProducts.map((product) => (
                <Box
                  borderWidth="1px"
                  borderRadius={4}
                  boxShadow={4}
                  key={product._id}
                  p={5}
                  mt={3}
                  mb={3}
                >
                  <Text color="green.600" fontWeight="bold">
                    #{product._id.substring(5, 10)}
                  </Text>
                  <Flex p={6} gap={3}>
                    <Img width="30%" height="30%" src={product.imgUrl}></Img>
                    <Box>
                      <Text fontSize="large" fontWeight="bold">
                        {product.title}
                      </Text>

                      <Text
                        fontWeight="bold"
                        color={
                          product.availableStock > 0 ? "green.600" : "red.600"
                        }
                      >
                        {product.availableStock > 0
                          ? product.availableStock === 1
                            ? "only 1 item left"
                            : `${product.availableStock} items in stock`
                          : "SOLD OUT"}
                      </Text>
                      <Text color="orange.600" fontWeight="bold">
                        Category - {product.category}
                      </Text>
                      <Flex gap={3}>
                        <Text
                          color="blue.600"
                          fontSize="xl"
                          sx={{
                            textDecorationLine:
                              product.isOnSale && "line-through",
                          }}
                        >
                          ${product.price}
                        </Text>
                        {product.isOnSale && (
                          <Text
                            color="orange.600"
                            fontSize="2xl"
                            fontWeight="bold"
                          >
                            ${product.salePrice}
                          </Text>
                        )}
                      </Flex>
                    </Box>
                  </Flex>

                  <ButtonGroup>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        setProductFormData(product);
                        setIsEditing(true);
                      }}
                    >
                      <EditIcon></EditIcon>
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        setIsEditing(false);
                        dispatch(deleteProductAction(product._id));
                      }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </ButtonGroup>
                </Box>
              ))}
            </Box>
          ) : (
            <Text color="red">Add some products</Text>
          )}

          <Heading mt={4} mb={4}>
            {isEditing ? "Edit" : "Add"} Product
          </Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (isEditing) {
                dispatch(
                  updateProductAction(
                    productFormData._id,
                    productFormData,
                    toast
                  )
                );
              } else {
                dispatch(createProductAction(productFormData, toast));
              }

              clearForm();
              setIsEditing(false);
            }}
          >
            <Input
              required
              type="text"
              placeholder="imgUrl*"
              value={productFormData.imgUrl}
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  imgUrl: e.target.value,
                });
              }}
            />
            <Select
              value={productFormData.category}
              required
              placeholder="Select Category*"
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  category: e.target.value,
                });
              }}
            >
              <option value="Quran">Qur'an</option>
              <option value="mclothing">Men's Clothing</option>
              <option value="fclothing">Women's Clothing</option>
              <option value="accessories">Accessories</option>
            </Select>
            <Input
              required
              type="text"
              placeholder="Title*"
              value={productFormData.title}
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  title: e.target.value,
                });
              }}
            />
            <Textarea
              required
              placeholder="Description*"
              value={productFormData.description}
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  description: e.target.value,
                });
              }}
            />

            <Input
              required
              type="number"
              min={1}
              placeholder="max Quantity per purchase*"
              value={productFormData.maxQuantityPerPurchase}
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  maxQuantityPerPurchase: e.target.value,
                });
              }}
            />
            <Input
              required
              type="number"
              min={0}
              placeholder="available Stock*"
              value={productFormData.availableStock}
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  availableStock: e.target.value,
                });
              }}
            />
            <Input
              required
              type="number"
              min={1}
              placeholder="Price [value > 0]*"
              value={productFormData.price}
              onChange={(e) => {
                setProductFormData({
                  ...productFormData,
                  price: e.target.value,
                });
              }}
            />
            {productFormData.isOnSale && (
              <Input
                required
                type="number"
                min={1}
                placeholder="Sale Price [value > 0]*"
                value={productFormData.salePrice}
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    salePrice: e.target.value,
                  });
                }}
              />
            )}
            <CheckboxGroup>
              <Checkbox
                isChecked={productFormData.isOnSale}
                onChange={() => {
                  setProductFormData({
                    ...productFormData,
                    isOnSale: !productFormData.isOnSale,
                    salePrice: productFormData.isOnSale
                      ? productFormData.salePrice
                      : "",
                  });
                }}
              >
                Put Product on Sale
              </Checkbox>
              <Checkbox
                isChecked={productFormData.isFeatured}
                onChange={() => {
                  setProductFormData({
                    ...productFormData,
                    isFeatured: !productFormData.isFeatured,
                  });
                }}
              >
                Put Product as Featured
              </Checkbox>
            </CheckboxGroup>
            <br></br>
            <ButtonGroup>
              <Button type="submit">Submit</Button>
              {isEditing && (
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setIsEditing(false);
                    clearForm();
                  }}
                >
                  Cancel
                </Button>
              )}
            </ButtonGroup>
          </form>
        </Box>
      ) : (
        <>
          {" "}
          <Heading>Unauthorized</Heading>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
              <ModalHeader>Verify as Admin to access content</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {message && (
                  <Alert
                    sx={{
                      maxWidth: 400,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    status="error"
                  >
                    <Box display="flex">
                      <AlertIcon></AlertIcon>
                      <AlertDescription>{message}</AlertDescription>
                    </Box>
                    <CloseButton
                      onClick={() => {
                        setMessage(null);
                      }}
                    ></CloseButton>
                  </Alert>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(adminAuthorizeAction(adminCreds, setMessage));
                    setAdminCreds({ username: "", password: "" });
                  }}
                >
                  <Input
                    required
                    type="text"
                    placeholder="username*"
                    value={adminCreds.username}
                    onChange={(e) => {
                      setAdminCreds({
                        ...adminCreds,
                        username: e.target.value,
                      });
                    }}
                  />
                  <Input
                    required
                    type="password"
                    placeholder="password*"
                    value={adminCreds.password}
                    onChange={(e) => {
                      setAdminCreds({
                        ...adminCreds,
                        password: e.target.value,
                      });
                    }}
                  />
                  <Button type="submit">Verify</Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Admin;
