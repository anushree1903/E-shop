import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { BsBag } from "react-icons/bs";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";

const Header = () => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    window.addEventListener("scroll", () =>
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
    );
  });

  return (
    <header
      className={`${
        isActive ? "bg-white py-2 shadow-md" : "bg-transparent py-1"
      } fixed w-full z-20 transition-all duration-300`}
    >
      <div
        ref={ref}
        className="container mx-auto flex items-center justify-between h-full md:px-4"
      >
        <Link to={"/"}>
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
          >
            <img className="w-[70px]" src={Logo} alt="" />
          </motion.div>
        </Link>
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
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
        >
          <BsBag className="text-xl mr-2 -mt-2" />
          <div className="bg-red-500 absolute right-0 -bottom-2 text-[10px] w-[16px] h-[16px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;