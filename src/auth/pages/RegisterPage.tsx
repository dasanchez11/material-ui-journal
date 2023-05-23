import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "react-router-dom";
import { Validator, useForm } from "../../hooks";
import { FormEvent, useState } from "react";
import { AuthRegister } from "../models";

const formData = {
  password: "password",
  email: "test@example.com",
  displayName: "Example",
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
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
              <Button
                disabled={isFormValid}
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
