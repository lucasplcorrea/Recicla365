import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Modal, TextField, Button, FormControlLabel, Checkbox, FormGroup, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const ListaLocais = () => {
  const [locais, setLocais] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmacaoExclusaoAberta, setConfirmacaoExclusaoAberta] = useState(false);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await fetch('http://localhost:5000/locaisDeColeta');
        if (!response.ok) {
          throw new Error('Erro ao buscar locais de coleta');
        }
        const data = await response.json();
        setLocais(data);
      } catch (error) {
        console.error('Erro ao buscar locais de coleta:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocais();
  }, []);

  const abrirModalEditar = (local) => {
    setLocalSelecionado(local);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalSelecionado({
      ...localSelecionado,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setLocalSelecionado({
      ...localSelecionado,
      tiposResiduos: {
        ...localSelecionado.tiposResiduos,
        [name]: checked,
      },
    });
  };

  const handleSalvarEdicao = async () => {
    try {
      const response = await fetch(`http://localhost:5000/locaisDeColeta/${localSelecionado.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localSelecionado),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar local de coleta');
      }
      const updatedLocais = locais.map(local => {
        if (local.id === localSelecionado.id) {
          return localSelecionado;
        }
        return local;
      });
      setLocais(updatedLocais);
      fecharModal();
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
    }
  };

  const handleAbrirConfirmacaoExclusao = (local) => {
    setLocalSelecionado(local);
    setConfirmacaoExclusaoAberta(true);
  };

  const handleFecharConfirmacaoExclusao = () => {
    setConfirmacaoExclusaoAberta(false);
  };

  const handleConfirmarExclusao = async () => {
    try {
      const response = await fetch(`http://localhost:5000/locaisDeColeta/${localSelecionado.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir local de coleta');
      }
      const updatedLocais = locais.filter(local => local.id !== localSelecionado.id);
      setLocais(updatedLocais);
      setConfirmacaoExclusaoAberta(false);
    } catch (error) {
      console.error('Erro ao excluir local de coleta:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {locais.map(local => (
          <Grid item xs={12} sm={6} md={4} key={local.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {local.nome}
                </Typography>
                <Typography color="textSecondary">
                  {local.descricao}
                </Typography>
                <Button onClick={() => abrirModalEditar(local)}>Editar</Button>
                <Button onClick={() => handleAbrirConfirmacaoExclusao(local)} color="error">Excluir</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de edição */}
      <Modal open={modalAberto} onClose={fecharModal}>
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '80%', maxWidth: '600px', overflowY: 'auto', maxHeight: '80vh' }}>
    <Typography variant="h5" gutterBottom>Editar Local de Coleta</Typography>
    {localSelecionado && (
      <form>
        {Object.keys(localSelecionado).map(key => {
          if (key !== 'id' && key !== 'identificadorUsuario' && key !== 'nomeUsuario' && key !== 'tiposResiduos') {
            return (
              <TextField
                key={key}
                name={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={localSelecionado[key] || ''}
                onChange={handleInputChange}
                fullWidth
                style={{ marginBottom: '10px' }}
              />
            );
          }
          return null;
        })}
        {/* Checkboxes para tipos de resíduos */}
        <Typography variant="subtitle1" gutterBottom>Tipos de Resíduos</Typography>
        <FormGroup>
          {localSelecionado && localSelecionado.tiposResiduos && Object.entries(localSelecionado.tiposResiduos).map(([key, value]) => (
            <FormControlLabel
              key={key}
              control={<Checkbox
                name={key}
                checked={value}
                onChange={handleCheckboxChange}
              />}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </FormGroup>
        <Button onClick={handleSalvarEdicao} variant="contained" style={{ marginRight: '10px' }}>Salvar</Button>
        <Button onClick={fecharModal} color="error" variant="contained">Cancelar</Button>
      </form>
    )}
  </Box>
</Modal>


      {/* Modal de confirmação de exclusão */}
      <Dialog open={confirmacaoExclusaoAberta} onClose={handleFecharConfirmacaoExclusao}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Tem certeza de que deseja excluir este local de coleta?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFecharConfirmacaoExclusao}>Cancelar</Button>
          <Button onClick={handleConfirmarExclusao} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListaLocais;
