import { RefObject, useState } from "react";
import CustomInput from "../UI/CustomInputComponent/CustomInput";
import classes from "./FormModal.module.css";
import { EmployeeInputError, EmployeeState } from "../../util/Types";
import { handleSubmitValues } from "../../util/http";
import { birthdateValidation, validation } from "../../util/inputValidations";
import { timestampToDate } from "../../util/methods";
import CustomButton from "../UI/CustomButtonComponent/CustomButton";

type FormModalProps = {
  modalRef: RefObject<HTMLDialogElement>;
  rerenderHandler: () => void;
  closeModalHandler: () => void;
};

export default function FormModal({
  modalRef,
  rerenderHandler,
  closeModalHandler,
}: FormModalProps) {
  const [error, setError] = useState<string>(""); //errors from the backend
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputErrors, setInputErrors] = useState<EmployeeInputError>({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    birthdate: "",
  });
  const [inputValues, setInputValues] = useState<EmployeeState>({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    birthdate: 0,
  });

  function handleInputValues(value: string | number, name: string) {
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function resetInputsOnClose() {
    setInputValues(() => {
      const resetValues = {
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        birthdate: 0,
      };
      return resetValues;
    });
    setInputErrors({
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      birthdate: "",
    });
    setError("");
    closeModalHandler();
  }

  function inputValidation() {
    const firstNameError = validation(inputValues.firstName, "First name");
    const lastNameError = validation(inputValues.lastName, "Last name");
    const cityError = validation(inputValues.city, "City");
    const countryError = validation(inputValues.country, "Country");
    const birthdateError =
      validation(inputValues.birthdate, "Birthday") === ""
        ? birthdateValidation(inputValues.birthdate)
        : validation(inputValues.birthdate, "Birthday");

    setInputErrors(() => {
      const updatedErrors: EmployeeInputError = {
        firstName: firstNameError,
        lastName: lastNameError,
        city: cityError,
        country: countryError,
        birthdate: birthdateError,
      };
      return updatedErrors;
    });
    if (
      firstNameError.length != 0 ||
      lastNameError.length != 0 ||
      cityError.length != 0 ||
      countryError.length != 0 ||
      birthdateError.length != 0
    ) {
      return false;
    } else {
      return true;
    }
  }
  async function handleSubmit() {
    if (!inputValidation()) return;
    setIsLoading(true);
    const response = await handleSubmitValues(inputValues, "/addNewEmployee");
    if (typeof response === "string") {
      setError(response);
    } else {
      rerenderHandler();
      resetInputsOnClose();
    }
    setIsLoading(false);
  }

  return (
    <dialog ref={modalRef} className={classes.container}>
      <div className={classes.content}>
        <h2 className={classes.title}>Add a new employee</h2>
        <div className={classes.inputDiv}>
          {error === "" ? null : (
            <p className={classes.errorMessage}>{error}</p>
          )}
          <CustomInput
            label="First name"
            onChange={handleInputValues}
            name="firstName"
            errorText={inputErrors.firstName}
            value={inputValues.firstName}
          />
          <CustomInput
            label="Last name"
            onChange={handleInputValues}
            name="lastName"
            errorText={inputErrors.lastName}
            value={inputValues.lastName}
          />
          <CustomInput
            label="Country"
            onChange={handleInputValues}
            name="country"
            errorText={inputErrors.country}
            value={inputValues.country}
          />
          <CustomInput
            label="City"
            onChange={handleInputValues}
            name="city"
            errorText={inputErrors.city}
            value={inputValues.city}
          />
          <CustomInput
            label="Birthday"
            onChange={handleInputValues}
            name="birthdate"
            errorText={inputErrors.birthdate}
            value={
              inputValues.birthdate === 0
                ? ""
                : timestampToDate(inputValues.birthdate)
            }
            date
          />
          <div className={classes.buttonsDiv}>
            <CustomButton onClickHandler={handleSubmit}>
              {isLoading ? "Adding..." : "Add"}
            </CustomButton>
            <CustomButton onClickHandler={resetInputsOnClose}>
              Close
            </CustomButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}
