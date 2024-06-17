export type Employee = {
  id: string;
} & EmployeeState;

export type EmployeeState = {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  birthdate: number;
}

export type EmployeeInputError ={
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  birthdate: string;
}

