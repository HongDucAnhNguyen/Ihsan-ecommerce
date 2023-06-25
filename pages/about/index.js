import { Heading, Box, Text } from "@chakra-ui/react";
import styles from "../../styles/Layout.module.css";
import { motion } from "framer-motion";

const About = () => {
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <div className={styles.container}>
      <Box maxW={1200} mt={20} p={20}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Heading>Who we are</Heading>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text fontSize="lg" lineHeight="tall" mt="4">
              We are a passionate team of individuals who share the same values
              and beliefs as our customers. As a Muslim-owned and operated
              business, we understand the importance of giving thoughtful and
              meaningful gifts that represent the beauty of Islam.
            </Text>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Heading mt={8}>What We do</Heading>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text fontSize="lg" lineHeight="tall" mt={4}>
              We offer a wide range of products that cater to your needs and
              help you express your love for Islam in a truly beautiful way. We
              take pride in providing unique and high-quality products that will
              make your loved ones feel special.
            </Text>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <Heading mt={8}>How we can help</Heading>
            </motion.div>
            <Text fontSize="lg" lineHeight="tall" mt={4}>
              We are here to assist you in finding the perfect gift that will be
              cherished for years to come. With our fast shipping and easy
              return policy, you can shop with confidence and peace of mind.
            </Text>
          </motion.div>
        </motion.div>
      </Box>
    </div>
  );
};
export default About;
