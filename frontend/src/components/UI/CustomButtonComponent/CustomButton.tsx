
import { ReactNode } from "react"
import classes from "./CustomButton.module.css"

export type CustomButtonProps ={
    children: ReactNode,
    onClickHandler:()=>void
}

export default function CustomButton({children,onClickHandler}:CustomButtonProps){
    return <div className={classes.container} >
            <button onClick={onClickHandler}>{children}</button>
        </div>
}