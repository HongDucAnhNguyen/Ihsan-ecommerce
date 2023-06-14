import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  CloseButton,
  Heading,
  IconButton,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Card,
  CardHeader,
  CardBody,
  Text,
  ButtonGroup,
  Avatar,
} from "@chakra-ui/react";
import {
  updateAccountAction,
  deleteAccountAction,
} from "@/actions/authActions";
import { EditIcon } from "@chakra-ui/icons";

const Account = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    newUsername: "",
    password: "",
    newPassword: "",
  });
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    setUser(userState);
  }, [userState]);
  useEffect(() => {
    setMessage("");
  }, [onClose]);

  return (
    <div className={styles.container}>
      {message ? (
        <Alert
          sx={{
            maxWidth: 400,
            display: "flex",
            justifyContent: "space-between",
          }}
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
      ) : (
        <div>
          {user ? (
            <>
              <Heading mb={4}>My Account</Heading>
              <Card minW="sm" maxW="md">
                <CardHeader>
                  <Flex justifyContent="space-between">
                    <Flex gap={3}>
                      <Avatar name={user?.result?.username} size="sm"></Avatar>
                      <Text fontSize="xl" fontWeight="bold">
                        {user?.result?.username}
                      </Text>
                    </Flex>

                    <Button
                      title="Edit Profile"
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    >
                      Edit Account<EditIcon ml={3}></EditIcon>
                    </Button>
                  </Flex>
                </CardHeader>

                {isEditing && (
                  <CardBody>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(
                          updateAccountAction(
                            {
                              ...formData,
                              newUsername:
                                !formData.newUsername && user?.result?.username
                                  ? user.result.username
                                  : formData.newUsername,
                            },
                            user.result.id,
                            setMessage
                          )
                        );
                        setFormData({
                          newUsername: "",
                          password: "",
                          newPassword: "",
                        });
                      }}
                    >
                      <Input
                        type="text"
                        placeholder="New Username (optional)"
                        value={formData.newUsername}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            newUsername: e.target.value,
                          });
                        }}
                      />
                      <Input
                        required
                        type="password"
                        placeholder="Password*"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
                        }}
                      />
                      <Input
                        required
                        type="password"
                        placeholder="New Password*"
                        value={formData.newPassword}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            newPassword: e.target.value,
                          });
                        }}
                      />
                      <ButtonGroup mt={3}>
                        <Button colorScheme="blue" type="submit">
                          Update Account
                        </Button>
                        {user?.result?.role !== "admin" && (
                          <Button colorScheme="red" onClick={onOpen}>
                            Delete Account
                          </Button>
                        )}
                      </ButtonGroup>
                    </form>
                  </CardBody>
                )}

                <Modal
                  isCentered={true}
                  blockScrollOnMount={false}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Delete Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      Are you sure? You can't undo this action afterwards.
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          dispatch(
                            deleteAccountAction(user.result.id, setMessage)
                          );
                        }}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Card>
            </>
          ) : (
            <Heading>Please Log In or Register Account</Heading>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
