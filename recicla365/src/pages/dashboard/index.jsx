import * as React from 'react';
import Header from '../../components/header/index.jsx';
import Grid from '@mui/material/Grid';
import CardLocais from '../../components/cards/CardLocais.jsx';
import CardUsuarios from '../../components/cards/CardUsuarios.jsx';
import CardUltimoLocal from '../../components/cards/CardUltimoLocal.jsx';
import CardContadorLocais from '../../components/cards/CardResiduos.jsx';


export default function Dashboard() {
  
  return (
    <div>
      <Header />

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <CardUsuarios />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardLocais />
        </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CardUltimoLocal />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
          <CardContadorLocais />
          </Grid>
      </Grid>
    </div>
  );
}
