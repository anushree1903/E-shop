
import { Link } from "react-router-dom";
import fashion from "../img/fashion.jpg";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const Hero = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  const textControls = useAnimation();
  const imageControls = useAnimation();

  const textInView = useInView(textRef, { once: true });
  const imageInView = useInView(imageRef, { once: true });

  useEffect(() => {
    if (textInView) {
      textControls.start("visible");
    }
    if (imageInView) {
      imageControls.start("visible");
    }
  }, [textInView, imageInView, textControls, imageControls]);

  return (
    <motion.section
      className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20 bg-slate-100" 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* text */}
        <motion.div
          className="flex flex-col justify-center w-1/2 pl-16"
          ref={textRef}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 1 },
          }}
          initial="hidden"
          animate={textControls}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] mr-3 bg-red-700"></div>Hot Trend
          </div>
          <h1 className="uppercase text-[55px] md:text-[55px] leading-[1.1] font-semibold mb-4">
            Fresh Fashion Finds<br />
            <span className="font-light">new collection</span>
          </h1>
          <Link
            to={'/'}
            className='self-start uppercase font-semibold border-b-2 border-red-700 text-red-700'
          >
            Discover More
          </Link>
        </motion.div>

        {/* image */}
        <motion.div
          className="w-full md:w-1/2 hidden md:block"
          ref={imageRef}
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 1 },
          }}
          initial="hidden"
          animate={imageControls}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Add your image component or use an <img> tag here */}
          <img src={fashion} alt="Hero Image" className="h-[630px] pl-32 pb-14 pt-10" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
