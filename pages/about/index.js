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
      <Box mt={20} p={20}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Heading>Our Story</Heading>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text fontSize="lg" lineHeight="tall" mt="8">
              Welcome to Ihsan - Islamic Gift Shop, where the love for Islam and
              the desire to share it with others come together! Our goal is to
              provide you with the best products and gifts that represent the
              beauty and richness of Islam.
            </Text>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text fontSize="lg" lineHeight="tall" mt="8">
              We understand the importance of giving thoughtful and meaningful
              gifts, and that's why we've put together a collection of unique
              and high-quality items that will surely make your loved ones feel
              special. From stunning prayer mats to intricately designed Quran
              holders, our products are carefully selected to cater to your
              needs and to help you express your love for Islam in a truly
              beautiful way.
            </Text>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text fontSize="lg" lineHeight="tall" mt="8">
              At Ihsan, we take pride in being a Muslim-owned and operated
              business. Our team is made up of passionate individuals who share
              the same values and beliefs as our customers, and we're dedicated
              to providing you with the best shopping experience possible. We
              believe that by supporting each other, we can help build a
              stronger and more connected Muslim community.
            </Text>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text fontSize="lg" lineHeight="tall" mt="8">
              So why wait? Browse our selection today and let us help you find
              the perfect gift that will be cherished for years to come. With
              our fast shipping and easy return policy, you can shop with
              confidence and peace of mind. Join us on our mission to spread
              love and positivity through the beauty of Islam.
            </Text>
          </motion.div>
        </motion.div>
      </Box>
    </div>
  );
};
export default About;
