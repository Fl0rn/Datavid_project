import BirthdayItem from "../BirthdayItemComponent/BirthdayItem";
import classes from "./BirthdaysList.module.css";
import { Employee } from "../../util/Types";
import FormModal from "../FormModalComponent/FormModal";
import { useEffect, useRef, useState } from "react";
import { getAllValues } from "../../util/http";
import CustomButton from "../UI/CustomButtonComponent/CustomButton";

export default function BirthdaysList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [forcedRerener, setForcedRerender] = useState(0);
  //we need forced rerender beacuse atfer we post the new employee we need to fetch the list sorted
  const modalRef = useRef<HTMLDialogElement>(null);

  function modalShowHandler() {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.hasAttribute("open")
      ? modalRef.current.close()
      : modalRef.current.showModal();
  }

  function closeModalHandler() {
    if (!modalRef.current) {
      return;
    }
    modalRef.current.close();
  }

  async function fetchAllEmployees() {
    const employees: Array<Employee> = await getAllValues("/getAllEmployees");
    setEmployees(employees);
  }

  useEffect(() => {
    fetchAllEmployees();
  }, [forcedRerener]);

  return (
    <div className={classes.container}>
      <div className={classes.buttonContainer}>
        <CustomButton onClickHandler={modalShowHandler}>
          Add employee
        </CustomButton>
      </div>
      <div className={classes.content}>
        <div className={classes.birthdaylist}>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <BirthdayItem
                firstName={employee.firstName}
                lastName={employee.lastName}
                birthdate={employee.birthdate}
                city={employee.city}
                country={employee.country}
                key={employee.id}
              />
            ))
          ) : (
            <p className={classes.noEmployeeText}>No employees found. Add some!</p>
          )}
        </div>
      </div>
      <FormModal
        closeModalHandler={closeModalHandler}
        modalRef={modalRef}
        rerenderHandler={() => setForcedRerender((prevState) => prevState + 1)}
      />
    </div>
  );
}
