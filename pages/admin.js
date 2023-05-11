import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Layout.module.css";
import { useState, useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  CloseButton,
  Heading,
  Input,
  Select,
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
    clothingSizes: [],
  });
  const dispatch = useDispatch();
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
    });
  };
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [allProducts]);
  useEffect(() => {
    setIsAuthorized(authorizedStatus);
  }, [authorizedStatus]);
  useEffect(() => {
    setUser(userState);
  }, [userState]);
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
        <Box>
          <Heading>Inventory Management</Heading>
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
              <p>Category: {product.category}</p>
              <p>Price: {product.price}</p>
              {product.isOnSale && <p>Sale Price: {product.salePrice}</p>}
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
                }}
              >
                <DeleteIcon></DeleteIcon>
              </Button>
            </div>
          ))}
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
              <option value="MClothing">Men's Clothing</option>
              <option value="FClothing">Women's Clothing</option>
              <option value="Accessories">Accessories</option>
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
              placeholder="Price [value >=0]*"
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
                placeholder="Sale Price [value >=0]*"
                value={productFormData.salePrice}
                onChange={(e) => {
                  setProductFormData({
                    ...productFormData,
                    salePrice: e.target.value,
                  });
                }}
              />
            )}

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
          </form>
        </Box>
      ) : (
        <Box maxW="50%">
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

          <Heading>Verify as Admin to access content</Heading>
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
        </Box>
      )}
    </div>
  );
};

export default Admin;
