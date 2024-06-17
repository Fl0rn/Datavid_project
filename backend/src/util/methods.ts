export function isRequestValid(requestObject: Object): boolean {
  const requestPropertiesTypes = Object.values(requestObject).map(
    (v) => typeof v
  );

  return !requestPropertiesTypes.includes("undefined");
}

export function isNotOver18(timestamp: number) {
  const birthdate = new Date(timestamp);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthdate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthdate.getMonth();
  const dayDifference = currentDate.getDate() - birthdate.getDate();
 
  if (
    age < 18 ||
    (age === 18 &&
      (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
  ) {
    return true;
  }
  return false;
}


export function distanceToBirthday(birthdayTimestamp: number) {
  let today = new Date();
  const employeeDate = new Date(birthdayTimestamp);

  const currentYear = new Date().getUTCFullYear();
  let dateForDifference: Date;

  const month = today.getUTCMonth();
  const day = today.getUTCDate();
  const employeeMonth = employeeDate.getUTCMonth();
  const employeeDay = employeeDate.getUTCDate();

  if (employeeMonth < month || (employeeMonth === month && employeeDay < day)) {
    dateForDifference = new Date(Date.UTC(currentYear + 1, employeeMonth, employeeDay));
  } else {
    dateForDifference = new Date(Date.UTC(currentYear, employeeMonth, employeeDay));
  }

  return dateForDifference.getTime() - today.getTime()
}
