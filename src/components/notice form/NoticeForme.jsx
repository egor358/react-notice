import React, { useEffect, useReducer, useRef } from "react";
import styles from "./NoticeFrome.module.css";
import { Input } from "../input/Input";
import { formReducer, INITIAL_STATE } from "../form state/Form.state";
import { Textarea } from "./textarea/Textarea";
import CardButton from "../CardButton/CardButton";

export const NoticeForme = ({ data, onSubmit, onDelete }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, values, isFormReadyToSubmit } = formState;

  const titleRef = useRef();
  const textareaRef = useRef();
  const dateRef = useRef();

  const focusErrorInput = (isValid) => {
    switch(true){
     case !isValid.title:
      titleRef.current.focus()
      break
     case !isValid.date:
      dateRef.current.focus()
      break
     case !isValid.text:
      textareaRef.current.focus()
      break

    }
  };

  useEffect(()=>{
    if(isFormReadyToSubmit){
       onSubmit(values) 
       dispatchForm({
        type:"CLEAR_FORM"
       })
    }
  },[values,onSubmit,isFormReadyToSubmit])

  useEffect(() => {
    dispatchForm({
      type: "SET_FORM",
      payload: data ?? INITIAL_STATE.values,
    });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.text || !isValid.date) {
      focusErrorInput(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isValid]);

  const addNoticeItem = () => {
    dispatchForm({ type: "SUBMIT" });
  };
  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: {
        [e.target.name]: e.target.value,
      },
      values,
    });
  };

  return (
    <form action={addNoticeItem} className={styles["journal-form"]}>
      <div className={styles["form-row"]}>
        <Input
          onChange={onChange}
          className="input-title"
          type="text"
          ref={titleRef}
          name="title"
          placeholder="input name notice"
          value={values.title}
          isValid={!isValid.title}
        />
        <CardButton
          className="delete"
          type="button"
          onClick={() => onDelete(data.id)}
          disabled={!data?.id}
        >
          <img src="/delete.svg" alt="удалить метку" />
        </CardButton>
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-lable"]}>
          <img src="/data.svg" alt="метка" />
          <span>Дата</span>
        </label>
        <Input
          ref={dateRef}
          onChange={onChange}
          type="date"
          name="date"
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          isValid={!isValid.date}
          id="date"
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-lable"]}>
          <img src="/folder.svg" alt="метка" />
          <span>Метки</span>
        </label>
        <Input
          onChange={onChange}
          type="text"
          name="tag"
          placeholder="input tags"
          value={values.tag}
          id="tag"
        />
      </div>
      <Textarea
        onChange={onChange}
        className="textarea"
        name="text"
        ref={textareaRef}
        value={values.text}
        cols="30"
        rows="10"
        isValid={!isValid.text}
        placeholder="description"
      />
      <CardButton type="submit" className="save-button">
        Сохранить
      </CardButton>
    </form>
  );
};
