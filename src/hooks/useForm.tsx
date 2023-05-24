import { ChangeEvent, useEffect, useMemo, useState } from "react";

export type Validator<T extends Record<string, any>> = {
  [K in keyof T]: [(value: string) => boolean, string];
};

type CheckValues<T extends object> = {
  [K in keyof T as `${Extract<K, string>}Valid`]: string | null;
};

export const useForm = <T extends Object>(
  initialForm: T,
  formValidations: Validator<T>
) => {
  const [formState, setFormState] = useState<T>(initialForm);
  const [formValidation, setFormValidation] = useState<CheckValues<T>>(
    {} as CheckValues<T>
  );

  useEffect(() => {
    createValidators();
  }, [formState]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue as keyof typeof formValidation] !== null)
        return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormState((state: T) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const createValidators = () => {
    const formCheckedValues = {} as CheckValues<T>;

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField as keyof T];
      (formCheckedValues as any)[`${formField}Valid`] = fn(
        formState[formField as keyof T] as string
      )
        ? null
        : errorMessage;
    }
    setFormValidation(formCheckedValues);
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    ...formValidation,
    isFormValid,
  };
};
