import { useEffect, useState, useContext } from "react";
import { Box, Button, Grid, TextField, FormControlLabel, FormControl, InputLabel, Input } from "@mui/material";
import { Formik } from 'formik';
import * as yup from 'yup';
import { StateContext } from "../../store/DataProvider";

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
        .required('Phone No is required')
});

export interface IProps {
    handleClose: () => void;
}

const AddClient: React.FC<IProps> = (props) => {
    const { state, dispatch } = useContext(StateContext);

    const {handleClose} = props;
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    const handleContinue = (values: any) => {
        setFirstName(values.firstName);
        setLastName(values.lastName);
        setStep(2);
    }

    const handleCreateClient = (values: any) => {
        dispatch({ type: "ADD_CLIENT", data: {firstName: firstName, lastName: lastName, email: values.email, phoneNumber: values.phoneNo} })
        handleClose();
    }

    return (
        <div>
            {
                step === 1 ?  
                <div>
                    <Formik validationSchema={validationSchema} initialValues={{
                        firstName: firstName,
                        lastName: lastName
                    }} onSubmit={handleContinue}
                    >
                        {({ values, handleSubmit, handleChange, touched, errors }) => (
                     <form onSubmit={handleSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <label>
                                    First Name
                                    <TextField fullWidth
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
                                        onChange={handleChange}
                                        error={touched.lastName && Boolean(errors.lastName)}
                                        helperText={touched.lastName && errors.lastName}
                                        value={values.lastName}
                                        id='lastName' name='lastName'
                                    />
                                </label>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                    <Button variant="outlined" color='primary'  type="submit">Continue</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                        )}
                    </Formik>
                </div>
                :  
                <div>
                    <div>{firstName} {lastName} {email} {phoneNo}</div>
                    <Formik validationSchema={validationSchemaStep2} initialValues={{
                        email: email,
                        phoneNo: phoneNo
                    }} onSubmit={handleCreateClient}
                    >
                        {({ values, handleSubmit, handleChange, touched, errors }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <label>
                                        Email
                                        <TextField fullWidth
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            value={values.email}
                                            id='email' name='email'
                                        />
                                    </label>
                                </Grid>
                                <Grid item xs={12}>
                                    <label>
                                        Phone number
                                        <TextField fullWidth
                                            onChange={handleChange}
                                            error={touched.phoneNo && Boolean(errors.phoneNo)}
                                            helperText={touched.phoneNo && errors.phoneNo}
                                            value={values.phoneNo}
                                            id='phoneNo' name='phoneNo'
                                        />
                                    </label>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
                                        <Button variant="outlined" color='primary' fullWidth={true} onClick={() => setStep(1) }>
                                            Back
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                        <Button variant="outlined" color='primary' fullWidth={true} type="submit">Create client</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                    </Formik>
                </div>
            }
        </div>
    );
  };
  
export default AddClient;