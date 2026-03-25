import React from 'react'
import styles from "./Textarea.module.css"
import cn from "classnames"


export const Textarea = ({ref,isValid=false,className, ...props}) => {
  return (
    <textarea
    ref={ref}
   {...props}
   className={cn(styles["textarea"],styles[className],{
       [styles["invalid"]]:isValid
     })}>

    </textarea>
  )
}
