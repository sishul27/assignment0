import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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
import Step from '@mui/material/Step';
import Login from './feed';
import StepLabel from '@mui/material/StepLabel';
import Sign from './sign';
import ForgotPwd from './forgot';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const steps = ['Login', 'Sign Up', 'Forgot Password'];
function getStepContent(step) {
  switch (step) {
    case 0:
      return <Log/>;
    case 1:
      return <Sign/>;
    case 2:
      return <ForgotPwd/>;
    default:
      throw new Error('Unknown step');
  }
}
const theme = createTheme();
export default function Log() {
  const [activeStep, setActiveStep] = React.useState(0);

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
      userid: data.get('userid'),
      Password: data.get('Password'),
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
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
        <Paper variant="outlined" sx={{ my: { xs: 4, md: 6 }, p: { xs: 3, md: 6 } }}>
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
                Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
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
                id="Password"
                name="Password"
                label="Password"
                fullWidth
                variant="standard"
            />
            </Grid>
            <Button
            component="a" href="./feed" startDecorator={<Login />}
             type="submit"
             fullWidth
             variant="contained"
             sx={{ mt: 3, mb: 2 }}
            >
             Login 
           
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="./forgot" variant="body2">
                  Forgot Password
                </Link>
                <br></br>
                <br></br>
                
                <Link href="./sign" variant="body2">
                  Don't have an account? SignUp
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