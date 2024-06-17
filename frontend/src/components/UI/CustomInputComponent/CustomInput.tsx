import { dateToTimestamp } from "../../../util/methods";
import classes from "./CustomInput.module.css";
type CustomInputProps = {
  label: string;
  date?: boolean;
  value?:string | number
  name: string;
  errorText:string
  onChange: (value: string | number, name: string) => void;
};

export default function CustomInput({
  label,
  onChange,
  name,
  date,
  errorText,
  value,
}: CustomInputProps) {
  const inputClassName = errorText === "" ?  classes.input : `${classes.input} ${classes.errorInput}`;
  console.log(errorText)
  return (
    <div className={classes.container}>
      <label className={classes.label}>{label}</label>
      <input
        value={value}
        className={inputClassName}
        type={date ? "date" : undefined}
        onChange={(event) => {
          date
            ? onChange(dateToTimestamp(event.target.value), name)
            : onChange(event.target.value, name);
        }}
      />
      <span className={classes.errorSpan}>{errorText}</span>
    </div>
  );
}
