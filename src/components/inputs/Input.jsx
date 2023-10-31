import React from "react";
import { ErrorMessage, Field } from "formik";
import { FormControl, InputBase, InputLabel } from "@mui/material";
import classes from './styles/Input.module.css'
import classesError from './styles/InputError.module.css'
import InputError from "./InputError";
const Input = (props) =>
{
    const {
        label,
        name,
        type,
        disabled,
        dir,
        children,
        ...rest
    } = props;

    return (
        <Field
            name={name} >
            {({ field, meta: { touched, error } }) =>
            {
                const inputError = !!error && touched;
                return (
                    <FormControl
                        className={`
                            ${classes.input} 
                            ${inputError && classesError.formError}
                        `}
                        variant="filled"
                        fullWidth
                        disabled={disabled}
                        dir={dir}
                    >
                        <InputLabel
                            className={dir === "rtl" ? classes.labelArabic : classes.labelEnglish}
                            shrink
                            htmlFor={name}
                        >
                            {label}
                        </InputLabel>
                        <InputBase
                            name={name}
                            id={name}
                            type={type}
                            label={label}
                            {...field}
                            {...rest}
                            variant="outlined"
                            className={!!children && classes.password}
                        />
                        {children}
                        <ErrorMessage
                            name={name}
                            component={InputError}
                        />
                    </FormControl>
                );
            }}
        </Field >
    );
}

export default Input;
