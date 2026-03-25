import React from 'react'
import cn from "classnames"
import styles from "./Input.module.css"

export const Input = ({ref, isValid=false, className, ...props}) => {
  return (
   <input 
   ref={ref}
   {...props}
  className={cn(styles["input"],styles[className],{
    [styles["invalid"]]:isValid
  })}/>
  )
}
