import datavid_logo from "../../assets/images/datavid_logo.jpeg";
import classes from './Header.module.css'
export default function Header() {
  return (
    <div className={classes.container}>
      <img src={datavid_logo} className={classes.image} />
      <h1 className={classes.title}>Cake tracker</h1>
    </div>
  );
}
