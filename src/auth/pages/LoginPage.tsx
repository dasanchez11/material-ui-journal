import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { Validator, useForm } from "../../hooks";
import { FormEvent, useMemo, useState } from "react";
import { useAppDispatch } from "../../store";
import { googleLoginAsync, loginAsync } from "../../store/auth/thunks";
import { useAppSelector } from "../../store/hooks/useAppSelector.hook";
import { AuthLogin } from "../models/auth.model";

const validationForm: Validator<AuthLogin> = {
  email: [(value: string) => value.includes("@"), "email should haver @"],
  password: [
    (value: string) => value.length >= 6,
    "pasword should contain at least 6 characters",
  ],
};

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState(false);

  const { status } = useAppSelector((state) => state.auth);

  const {
    email,
    password,
    onInputChange,
    emailValid,
    passwordValid,
    isFormValid,
  } = useForm<AuthLogin>(
    {
      email: "diego@example.com",
      password: "password",
    },
    validationForm
  );

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    dispatch(loginAsync({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(googleLoginAsync());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              autoComplete="off"
              value={email}
              name="email"
              error={!!emailValid && submitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              autoComplete="off"
              value={password}
              name="password"
              error={!!passwordValid && submitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating || !isFormValid}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            Dont' have an account?
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/register"
              sx={{ ml: 1 }}
            >
              Register
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
