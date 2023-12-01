import { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";
import { useInView } from 'react-intersection-observer';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust the threshold as needed
  });

  // destructure product
  const { id, image, category, title, price } = product;

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={productVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit={{ opacity: 0, y: -20 }}
      className="mb-4"
      transition={{ duration: 1, ease: "easeInOut" }} // Adjust the duration and easing
    >
      <motion.div
        className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }} // Adjust the duration and easing
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <motion.img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={image}
              alt=""
              whileHover={{ scale: 1.1 }}
            />
          </div>
        </div>

        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCart(product, id)}>
            <motion.div
              className="flex justify-center items-center text-white w-12 h-12 bg-red-600"
              whileHover={{ scale: 1.1 }}
            >
              <BsPlus className="text-3xl" />
            </motion.div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <BsEyeFill />
            </motion.div>
          </Link>
        </div>
      </motion.div>

      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <motion.h2
            className="font-semibold mb-1"
            whileHover={{ color: "#dc2626" }}
          >
            {title}
          </motion.h2>
        </Link>

        <motion.h2 className="font-semibbold" whileHover={{ color: "#4CAF50" }}>
          $ {price}
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default Product;