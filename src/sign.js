import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import Checkbox from '@mui/material/Checkbox';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import { Login } from '@mui/icons-material';
import ForgotPwd from './forgot';
import Log from './log';
import { Password } from '@mui/icons-material';

const steps = ['Login', 'Sign Up', 'Forgot Password'];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <Log/>;
    case 1:
      return <Sign />;
    case 2:
      return <ForgotPwd/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Sign() {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        firstname: data.get('firstname'),
        userid: data.get('userid'),
        email: data.get('email'),
        password: data.get('password'),
        confirm: data.get('confirm'),

    });
}
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={1}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            COE Solutions
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Welcome
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
     
           <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
             <Grid item xs={12} >
                <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                />
            </Grid>
            <Grid item xs={12} >
            <TextField
                required
                id="userid"
                name="userid"
                label="User Id"
                fullWidth
                variant="standard"
            />
             </Grid>
            <Grid item xs={12}>
            <TextField
                required
                id="email"
                name="email"
                label="E-Mail ID"
                fullWidth
                variant="standard"
             />
            </Grid>
            <Grid item xs={12}>
            <TextField
                id="password"
                name="password"
                label="Password"
                fullWidth
                variant="standard"
            />
            </Grid>
             <Grid item xs={12} >
             <TextField
                required
                id="confirm"
                name="confirm"
                label="Confirm Password"
                fullWidth
                variant="standard"
            />
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="./log" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>  
            </Grid>
            </Box>
            </React.Fragment>
            
    
        </Paper>
        </Container>
        </ThemeProvider>
  );
}