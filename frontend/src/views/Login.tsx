import api from 'api';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { setLocalStorage } from 'utils/utils';

import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  CssBaseline,
  Grid,
  Toolbar,
  Button,
  TextField,
  Container,
  ThemeProvider, 
  createMuiTheme,
  // Backdrop,
} from '@material-ui/core';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  createTheme,
  Paper,
  Backdrop,
  Dialog,
  Stack,
  Menu,
  MenuItem,
  Fade,
  Divider,
  Checkbox,
} from '@mui/material';

import useStyles from '../style/LoginStyles'; // new styling
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderProjects, setRenderProjects] = useState(false);
  const history = useHistory();
  const link = '/project-select';

  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.type) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
    }
  };

  const loginUser = (e: React.FormEvent) => {
    e.preventDefault();
    //api call

    api
      .login(email, password)
      .then((res) => {
        setLocalStorage('pipeline_token', res.token);
        setLocalStorage('isAdmin', res.isAdmin);
        history.push(link);
      })
      .catch((err) => alert(err.message));
  };

  const classes = useStyles(); // For Styling

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //
  // the following is for the visibility icon
  //
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  interface Prop {
    pass: string; // makes the handleChange work
  }

  const handleChange =
    (prop: Prop) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
      >
    ) => {
      setValues({ ...values, [prop.pass]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
    >
  ) => {
    event.preventDefault();
  };
  // End Visibility Icon
  //
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const theme = createMuiTheme ({
    typography: {
      fontFamily: ['Fenix', 'serif'].join(','),
    }
  })

  return (
    <>
      <CssBaseline />

      <AppBar position="relative">
        <Toolbar className={classes.title}>
          <Typography  variant='h3' className={classes.titleContent}>
            HONOR GUARD INSPECTIONS
          </Typography>
        </Toolbar>
      </AppBar>

      {/* centers all elements */}
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.page}
      >
        <main className={classes.main}>
          <div>
            <Container maxWidth="md" >
              <Card raised className={classes.roundedContainer}>
                <CardContent className={classes.header}>
                  <Typography
                    variant="h3"
                    align="center"
                    className={classes.headerText}
                  >
                    Login
                  </Typography>
                </CardContent>

                {/* E-mail */}
                <CardContent className={classes.cardContent}>
                  <TextField
                    fullWidth
                    required
                    id="filled-required"
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={updateFields} // Not working
                    // Probably need to fuck with adding props to updateFields
                  />
                </CardContent>

                {/* Password */}
                <CardContent className={classes.cardContent}>
                  <FormControl fullWidth required variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      //placeholders
                      // type={values.showPassword ? 'text' : 'password'}
                      // value={values.password}
                      // onChange={handleChange({pass: 'password'})}

                      type={values.showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={updateFields}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            // the following kept busting the menu for some reason
                            // edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      // label="Password"
                    />
                  </FormControl>

                  {/* Old Password */}
                  {/* <TextField fullWidth required id="outlined-required" label="Password"/> */}
                </CardContent>
                <Grid container spacing={2} justify="center" className={classes.temp01}>
                  {/* "Log In" */}
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.buttonPrimary}
                      onClick={loginUser}
                    >
                      Login
                    </Button>
                  </div>

                  {/* "Forgot Password?" */}
                  <div>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.buttonSecondary}
                    >
                      Forgot Password?
                    </Button>
                  </div>
                </Grid>
              </Card>
            </Container>
          </div>
        </main>
      </Grid>
      <Footer />
    </>
  );
};

export default Login;
