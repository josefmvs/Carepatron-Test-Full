import { memo, useContext, useEffect, useState } from "react";
import { Paper, Typography, Grid, Box, Button } from "@mui/material";
import { StateContext } from "../../store/DataProvider";
import Page from "../../components/Page";
import CPAutocomplete from "../../components/CPAutocomplete";
import CPModal from "../../components/CPModal";
import ClientTable from "./ClientTable";
import { getClients } from "../../services/api";
import './clientPage.css';

function Clients() {
  const { state, dispatch } = useContext(StateContext);
  const { clients } = state;
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    getClients().then((clients) =>
      dispatch({ type: "FETCH_ALL_CLIENTS", data: clients })
    );
  }, [dispatch]);

  const handleModal = () => {
    setOpenModal(true);
  }

  return (
    <Page>
      <Typography variant="h4" sx={{ textAlign: "start" }}>
        Clients
      </Typography>
      <Grid mt={3} container>
        <Grid xs={6}>
          <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
            <CPAutocomplete></CPAutocomplete>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button id='new-client-btn' variant="contained" onClick={handleModal}>Create new client</Button>
          </Box>
        </Grid>
      </Grid>
      <Paper sx={{ margin: "auto", marginTop: 3 }}>
        <ClientTable clients={clients} />
      </Paper>
      <CPModal open={openModal}></CPModal>
    </Page>
  );
}

export default memo(Clients);
