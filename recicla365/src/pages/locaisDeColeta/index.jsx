import * as React from "react";
import DrawerAppBar from "../../components/externalHeader";
import LabelBottomNavigation from "../../components/footer";
import ExternalLocaisDeColeta from "../../components/externalCards/externalLocaisDeColeta";
import { Grid } from '@mui/material';

export default function LocaisDeColeta() {
  const [locaisDeColeta, setLocaisDeColeta] = React.useState([]);

  React.useEffect(() => {
    const fetchLocaisDeColeta = async () => {
      try {
        const response = await fetch('http://localhost:5000/locaisDeColeta');
        const data = await response.json();
        setLocaisDeColeta(data);
      } catch (error) {
        console.error('Erro ao buscar os locais de coleta:', error);
      }
    };

    fetchLocaisDeColeta();
  }, []);

  return (
    <div>
      <DrawerAppBar title="Locais de Coleta" />
      <h1 style={{ textAlign: 'center' }}>Locais de Coleta</h1>
      <Grid container justifyContent="center" spacing={2} sx={{ justifyContent: 'center' }}>
        {locaisDeColeta.map((local, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <ExternalLocaisDeColeta local={local} />
          </Grid>
        ))}
      </Grid>
      <LabelBottomNavigation value="coletas" />
    </div>
  );
}
