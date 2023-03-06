import classes from "./logo.module.css";
import Image from "next/image";

function Logo() {
  return (
    <div className={classes.logo}>
      <Image src={"/images/logo.png"} alt={"logo"} width={180} height={180} />
    </div>
  );
}

export default Logo;
