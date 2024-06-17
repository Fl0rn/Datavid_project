import {
  EmployeeModel,
  addNewEmployee,
  findEmoplyee,
  getEmployees,
} from "../db/employees";
import { Request, Response } from "express";
import {
  distanceToBirthday,
  isNotOver18,
  isRequestValid,
} from "../util/methods";

export const createEmployee = async (req: Request, res: Response) => {
  const employeeRequest: EmployeeModel = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    country: req.body.country,
    birthdate: req.body.birthdate,
  };

  if (!isRequestValid(employeeRequest)) {
    res.status(400).send("Request object doesnt have all the properties");
    return;
  }

  if (
    Object.values(employeeRequest).includes("") ||
    employeeRequest.birthdate === 0
  ) {
    res.status(400).send("All fields are required");
    return;
  }

  if (isNotOver18(employeeRequest.birthdate)) {
    res.status(400).send("Employee must be over 18");
    return;
  }

  employeeRequest.firstName = employeeRequest.firstName.trim();
  employeeRequest.lastName = employeeRequest.lastName.trim();
  employeeRequest.city = employeeRequest.city.trim();
  employeeRequest.country = employeeRequest.country.trim();

  const userToCheck = await findEmoplyee(
    employeeRequest.firstName,
    employeeRequest.lastName,
    employeeRequest.city,
    employeeRequest.country
  );

  if (userToCheck.length > 0) {
    res.status(400).send("Every user should be unique");
    return;
  }

  const employee = await addNewEmployee(employeeRequest);
  const newEmployee = {
    id: employee._id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    country: employee.country,
    city: employee.city,
    birthdate: employee.birthdate,
  };
  res.json(newEmployee);
};

export const getAllEmployees = async (req: Request, res: Response) => {
  const allEmployees = await getEmployees();
  const employeesToSend = allEmployees.map((employee) => ({
    id: employee._id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    city: employee.city,
    country: employee.country,
    birthdate: employee.birthdate,
  }));

  employeesToSend.sort((a, b) => {
    const daysDifferenceA = distanceToBirthday(a.birthdate);
    const daysDifferenceB = distanceToBirthday(b.birthdate);
    return daysDifferenceA - daysDifferenceB;
  });

  res.json(employeesToSend);
};
