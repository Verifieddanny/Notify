import { Link } from "react-router-dom";
import notify from "../assets/notify.svg";
import { easeOut, motion } from "framer-motion";

const logoVarient = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    duration: 2,
    transition: {
      type: "spring",
      ease: easeOut,
      delay: -1,
    },
  },
};
const mainVarient = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,

    transition: {
      type: "spring",
      ease: easeOut,
    },
  },
};
function Landing() {
  return (
    <section className="landing">
      <motion.img
        variants={logoVarient}
        initial="hidden"
        animate="visible"
        src={notify}
        className="notify"
      />

      <motion.div
        variants={mainVarient}
        initial="hidden"
        animate="visible"
        className="land"
      >
        <h3>Welcome to Notify</h3>
        <span>
          <Link to={"/signup"}>Sign Up</Link>
          <Link to={"/login"}>Login</Link>
        </span>
      </motion.div>
    </section>
  );
}

export default Landing;
