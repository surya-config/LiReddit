import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
};

function InputField(props: InputFieldProps) {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor="name">{props.label}</FormLabel>
      <Input
        type={props.type}
        {...field}
        id={props.name}
        placeholder={props.placeholder}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}

export default InputField;
