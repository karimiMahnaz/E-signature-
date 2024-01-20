import React from "react";
import { useFormikContext } from "formik";
import CustomButton from "./customButton";

const SubmitButton = ({ title }) => {
    const { handleSubmit } = useFormikContext();
    return <CustomButton title={title} onPress={handleSubmit} />;
};

export default SubmitButton;
      