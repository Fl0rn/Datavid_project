import { isNotOver18 } from "../../../backend/src/util/methods";
export function validation(input:string|number, fieldName:string){
    if(input === "" || input === 0){
        return  `${fieldName} is required!`;
    }else{
        return ""
    }
}
export function birthdateValidation(timestamp:number){
  
    if(isNotOver18(timestamp)){
        return "All employees must be over 18"
    }else{
        return ""
    }
}