import formatDate from "../../util/methods";
import classes from "./BirthdayItem.module.css";

type BirthdayItemProps = {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  birthdate: number;
}

export default function BirthdayItem({
  lastName,
  firstName,
  birthdate,
  country,
  city,
}: BirthdayItemProps) {
  return (
    <div className={classes.container}>
      <div className={classes.locationAndNameDiv}>
        <div className={classes.nameDiv}>
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        <div className={classes.locationDiv}>
          <span>{country}, </span>
          <span>{city}</span>
        </div>
      </div>
      <div className={classes.birthdateDiv} >
        <span className={classes.birthdate}>{formatDate(birthdate)}</span>
      </div>
    </div>
  );
}
