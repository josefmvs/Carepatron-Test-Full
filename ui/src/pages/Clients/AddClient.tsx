import { useState, useContext } from "react";
import { Box, Button, Grid, TextField, Stepper, StepLabel, Step } from "@mui/material";
import { Formik } from 'formik';
import * as yup from 'yup';
import { StateContext } from "../../store/DataProvider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import './addClient.css';

const validationSchema = yup.object({
    firstName: yup
        .string()
        .required('First Name is required'),
    lastName: yup
        .string()
        .required('Last Name is required')
});

const validationSchemaStep2 = yup.object({
    email: yup
        .string()
        .required('Email is required'),
    phoneNo: yup
        .string()
        .required('Phone Number is required')
});

const steps = [
    'Personal details',
    'Contact details',
];

export interface IProps {
    handleClose: () => void;
}

const AddClient: React.FC<IProps> = (props) => {
    const { dispatch } = useContext(StateContext);

    const {handleClose} = props;
    const [step, setStep] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const handleContinue = (values: any) => {
        setFirstName(values.firstName);
        setLastName(values.lastName);
        setStep(1);
    }

    const handleCreateClient = (values: any) => {
        dispatch({ type: "ADD_CLIENT", data: {firstName: firstName, lastName: lastName, email: values.email, phoneNumber: values.phoneNo} })
        handleClose();
    }

    return (
        <div id='modal-wrapper'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={step}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
            <div style={{display: step === 0 ? 'block' : 'none' }}>
                <Formik id='step1-formik' validationSchema={validationSchema} initialValues={{
                    firstName: firstName,
                    lastName: lastName
                }} onSubmit={handleContinue}
                >
                    {({ values, handleSubmit, handleChange, touched, errors }) => (
                    <form id='step1-form' onSubmit={handleSubmit}>
                    <Grid container p={1} mt={1} spacing={3}>
                        <Grid item xs={12}>
                            <label>
                                First Name
                                <TextField fullWidth
                                    size="small"
                                    onChange={handleChange}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    value={values.firstName}
                                    id='firstName' name='firstName'
                                />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <label>
                                Last Name
                                <TextField fullWidth
                                    size="small"
                                    onChange={handleChange}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    value={values.lastName}
                                    id='lastName' name='lastName'
                                />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid mt={4} container>
                                <Grid item xs={12}>
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                        <Button sx={{textTransform: 'none'}} variant="contained" type="submit">Continue</Button>
                                    </Box> 
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
                    )}
                </Formik>
            </div>
            <div style={{display: step === 1 ? 'block' : 'none' }}>
                <Formik  id='step2-formik' validationSchema={validationSchemaStep2} initialValues={{
                    email: email,
                    phoneNo: phoneNo
                }} onSubmit={handleCreateClient}
                >
                    {({ values, handleSubmit, handleChange, touched, errors }) => (
                    <form id='step2-form' onSubmit={handleSubmit}>
                        <Grid container p={1} mt={1} spacing={3}>
                            <Grid item xs={12}>
                                <label>
                                    Email
                                    <TextField fullWidth
                                        size="small"
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        id='email' name='email'
                                    />
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <label>
                                    Phone number
                                    <TextField fullWidth
                                        size="small"
                                        onChange={handleChange}
                                        error={touched.phoneNo && Boolean(errors.phoneNo)}
                                        helperText={touched.phoneNo && errors.phoneNo}
                                        id='phoneNo' name='phoneNo'
                                    />
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid mt={4} container>
                                    <Grid item xs={6}>
                                        <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                                            <Button sx={{textTransform: 'none'}} variant="text" startIcon={<ArrowBack />} onClick={() => {
                                                setEmail(values.email);
                                                setPhoneNo(values.phoneNo);
                                                setStep(0);
                                            }}>
                                                Back
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Button sx={{textTransform: 'none'}} variant="contained" type="submit">Create client</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
                </Formik>
            </div>
        </div>
    );
  };
  
export default AddClient;