import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { FormEvent, useMemo, useState } from "react";
import { AuthRegister } from "../models";
import { useAppSelector } from "../../common/hooks/useAppSelector.hook";
import { Validator, useAppDispatch, useForm } from "../../common";
import { registerAsync } from "../store";

const formData = {
  password: "password",
  email: "diego@example.com",
  displayName: "Diego",
};

const validationForm: Validator<AuthRegister> = {
  email: [(value: string) => value.includes("@"), "email should haver @"],
  password: [
    (value: string) => value.length >= 6,
    "pasword should contain at least 6 characters",
  ],
  displayName: [
    (value: string) => value.length >= 1,
    "display name is required",
  ],
};

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const {
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    displayNameValid,
    passwordValid,
  } = useForm(formData, validationForm);

  const [submitted, setSubmitted] = useState(false);

  const { status, errorMessage } = useAppSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    dispatch(registerAsync({ displayName, email, password }));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              autoComplete="off"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && submitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              autoComplete="off"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && submitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="off"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && submitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!isFormValid || isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>Already Registered?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
