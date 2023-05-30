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
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
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
  }, [allProducts, dispatch]);
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
        <Box maxW="lg">
          <Heading>Inventory Management</Heading>
          {allProducts.length > 0 ? (
            <Box maxH="lg" overflow="auto">
              {allProducts.map((product) => (
                <div
                  style={{
                    margin: "5px",
                    padding: "5px",
                    border: "1px solid orange",
                  }}
                  key={product._id}
                >
                  <p>Item Id: {product._id}</p>
                  <p>Item On Sale: {product.isOnSale.toString()}</p>
                  <p>Item Featured: {product.isFeatured.toString()}</p>
                  <p>Title: {product.title}</p>
                  <p>Description: {product.description}</p>
                  <p>
                    max Quantity per Purchase: {product.maxQuantityPerPurchase}
                  </p>
                  <p>available Stock: {product.availableStock}</p>
                  <p>Category: {product.category}</p>
                  <p>Price: {product.price}</p>
                  {product.isOnSale && <p>Sale Price: {product.salePrice}</p>}
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
                        dispatch(deleteProductAction(product._id));
                        dispatch(getAllProductsAction());
                      }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </ButtonGroup>
                </div>
              ))}
            </Box>
          ) : (
            <Text color="red">Add some products</Text>
          )}

          <Heading>{isEditing ? "Edit" : "Add"} Product</Heading>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (isEditing) {
                dispatch(
                  updateProductAction(productFormData._id, productFormData)
                );
              } else {
                dispatch(createProductAction(productFormData));
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
            <Input
              required
              type="text"
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
