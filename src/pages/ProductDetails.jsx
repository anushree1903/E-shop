import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Contexts/CartContext";
import { ProductContext } from "../Contexts/ProductContext";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const ProductDetails = () => {
  // Get the product ID from the URL parameters
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);
  const { id } = useParams();
  console.log(id);
  // Get the list of products and the addCart function from contexts
  const { products } = useContext(ProductContext);
  const { addCart } = useContext(CartContext);

  // Find the product with the specified ID
  const product = products.find((item) => item.id === parseInt(id));

  // If the product is not found, display a loading message
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        <h1>loading...</h1>
      </section>
    );
  }

  // Destructure product details
  const { title, price, description, image } = product;

  return (
    <section className="md:pt-32 pt-16 h-screen flex py-12">
      <div className="container mx-auto overflow-y-auto md:overflow-hidden">
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: -100 },
            visible: { opacity: 1, y: 1 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          className=" md:mb-12 mb-2 text-center uppercase text-xl font-semibold tracking-wider"
        >
          Product Description
        </motion.h1>
        <div className="flex flex-col lg:flex-row md:pt-12 pt-6 justify-center space-y-6 px-4">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 1 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="w-full flex justify-center "
          >
            <img
              src={image}
              className="md:h-[400px] h-[350px] px-16  border border-[#e4e4e4] py-6"
              alt={title}
            />
          </motion.div>
          <motion.div
            ref={ref}
            variants={{
              hidden: { opacity: 0, x: 100 },
              visible: { opacity: 1, x: 1 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="ml-0 space-y-6 md:max-w-[750px]"
          >
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <p className="text-gray-700 mb-4 font-medium">{description}</p>
            <p className="text-2xl font-semibold mb-4 text-gray-700">
              $ {price}
            </p>

            <button
              className="text-gray-200 bg-slate-800 text-center py-2 px-4 uppercase hover:bg-slate-700 transition-all duration-200 cursor-pointer"
              onClick={() => addCart(product)}
            >
              Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;