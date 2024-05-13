import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import HeaderWithProfileMenu from '../../components/header/index.jsx';
import LabelBottomNavigation from '../../components/footer/index.jsx';

const ListagemUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter usuários:', error);
      });
  }, []);

  return (
    <>
      <HeaderWithProfileMenu />
      <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: 2, marginTop: 2 }}>  
        {usuarios.map(usuario => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={usuario.cpf}>
            <Card>
              <CardContent>
                <Typography variant="h6">{usuario.nome}</Typography>
                <Typography variant="body1">CPF: {usuario.cpf}</Typography>
                <Typography variant="body2">E-mail: {usuario.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <LabelBottomNavigation />
    </>
  );
};

export default ListagemUsuarios;
