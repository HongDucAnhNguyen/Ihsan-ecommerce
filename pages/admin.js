import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Layout.module.css";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { createProductAction } from "@/actions/productsActions";
const Admin = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  const [productFormData, setProductFormData] = useState({
    imgUrl: "",
    category: "",
    title: "",
    description: "",
    price: '',
    salePrice: '',
    isFeatured: false,
    isOnSale: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setUser(userState);
  }, [userState]);
  if (!user || user?.result?.id !== "6446ddb6685eec4e5df21f7b") {
    return <div className={styles.container}>Unauthorized</div>;
  }
  return (
    <div className={styles.container}>
      <Box>
        <Heading>Products Management</Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(createProductAction(productFormData));
            setProductFormData({
              imgUrl: "",
              category: "",
              title: "",
              description: "",
              price: '',
              salePrice: '',
              isFeatured: false,
              isOnSale: false,
            });
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
        </form>
      </Box>
    </div>
  );
};

export default Admin;
