import mongoose from "mongoose";
export interface EmployeeModel {
  firstName: string;
  lastName: string;
  birthdate: number;
  city: string;
  country: string;
}

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthdate: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});


const Employee = mongoose.model("Employee", employeeSchema);



export const addNewEmployee = (emoplyeeToAdd: EmployeeModel) => {
  const newEmployee = new Employee(emoplyeeToAdd);
  return newEmployee.save();
};

export const getEmployees = () => {
  return Employee.find();
};

export const findEmoplyee = (
  firstName: string,
  lastName: string,
  city: string,
  country: string
) => {
  return Employee.find({
    firstName: firstName,
    lastName: lastName,
    city: city,
    country: country,
  });
};
