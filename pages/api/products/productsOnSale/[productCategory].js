import Product from "@/models/Product";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { productCategory } = req.query;
      if (productCategory === "clothing") {
        const allMensClothingOnSale = await Product.find({
          $and: [
            {
              isOnSale: true,
            },
            { category: "mclothing" },
          ],
        });
        const allWomensClothingOnSale = await Product.find({
          $and: [
            {
              isOnSale: true,
            },
            { category: "fclothing" },
          ],
        });
        const allClothingOnSale = allWomensClothingOnSale.concat(
          allMensClothingOnSale
        );
        return res.status(200).json(allClothingOnSale);
      }
      const productsOnSale = await Product.find({
        $and: [
          {
            isOnSale: true,
          },
          { category: productCategory },
        ],
      });
      return res.status(200).json(productsOnSale);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong with the server" });
  }
};
export default handler;
