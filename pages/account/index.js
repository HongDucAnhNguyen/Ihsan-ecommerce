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
} from "@chakra-ui/react";
import {
  updateAccountAction,
  deleteAccountAction,
} from "@/actions/authActions";
import { EditIcon } from "@chakra-ui/icons";

const Account = () => {
  const userState = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: userState ? userState.result.username : "",
    password: "",
    newPassword: "",
  });
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    setUser(userState);
  }, [userState]);

  return (
    <div className={styles.container}>
      {message ? (
        <Alert
          sx={{
            maxWidth: 400,
            display: "flex",
            justifyContent: "space-between",
          }}
          // status={message.includes("invalid") ? "error" : "success"}
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
              <Heading>Account Management</Heading>
              <br />
              <Box display="flex">
                <Heading size="lg">Profile</Heading>
                <IconButton
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                >
                  <EditIcon></EditIcon>
                </IconButton>
              </Box>
              {isEditing && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                      updateAccountAction(formData, user.result.id, setMessage)
                    );
                    setFormData({
                      username: userState ? userState.result.username : "",
                      password: "",
                      newPassword: "",
                    });
                  }}
                >
                  <Input
                    required
                    type="text"
                    placeholder="New Username*"
                    value={formData.username}
                    onChange={(e) => {
                      setFormData({ ...formData, username: e.target.value });
                    }}
                  />
                  <Input
                    required
                    type="password"
                    placeholder="Password*"
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                    }}
                  />
                  <Input
                    required
                    type="password"
                    placeholder="New Password*"
                    value={formData.newPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, newPassword: e.target.value });
                    }}
                  />
                  <Button type="submit">Update Account</Button>
                </form>
              )}

              <Button onClick={onOpen}>Delete Account</Button>
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
