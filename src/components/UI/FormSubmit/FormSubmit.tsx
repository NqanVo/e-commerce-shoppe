import React, { memo } from "react";
import "./FormSubmit.scss";
interface FormSubmitProps {
  children: React.ReactNode;
  onSubmit: any;
  handleSubmit: any;
}

const FormSubmit = memo((props: FormSubmitProps) => {
  const { children, onSubmit, handleSubmit } = props;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="profile__body__form"
      encType="multipart/form-data"
    >
      {children}
    </form>
  );
});

export default FormSubmit;
