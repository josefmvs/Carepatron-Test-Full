import { Box, Button, Grid, TextField, FormControlLabel, FormControl, InputLabel, Input } from "@mui/material";
import { useEffect, useState } from "react";

export interface IProps {
    handleClose: () => void;
}

const AddClient: React.FC<IProps> = (props) => {
    const {handleClose} = props;
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if( step > 2 ){
            console.log('submit:' + `${name} ${lastName}`)
        }
    }, [step]);

    return (

        <div>
            {
                step === 1 ?  
                <div>
                    <Grid container>
                        <Grid item xs={12}>
                            <label>
                                First Name
                                <TextField fullWidth
                                    onChange={(event) => {
                                        // setName(event.target.value);
                                        // console.log(name);
                                    }}
                                    value={name}
                                    id='firstName' name='firstName'
                                />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <label>
                                Last Name
                                <TextField fullWidth
                                    onChange={(event) => {
                                        // setName(event.target.value);
                                        // console.log(name);
                                    }}
                                    value={name}
                                    id='lastName' name='lastName'
                                />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button variant="outlined" color='primary' onClick={() => setStep(2) }>Continue</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                :  
                <div>
                    <Grid container>
                        <Grid item xs={12}>
                            <label>
                                Email
                                <TextField fullWidth
                                    onChange={(event) => {
                                        // setName(event.target.value);
                                        // console.log(name);
                                    }}
                                    value={name}
                                    id='email' name='email'
                                />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <label>
                                Phone number
                                <TextField fullWidth
                                    onChange={(event) => {
                                        // setName(event.target.value);
                                        // console.log(name);
                                    }}
                                    value={name}
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
                                <Button variant="outlined" color='primary' fullWidth={true}>Create client</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
  };
  
export default AddClient;