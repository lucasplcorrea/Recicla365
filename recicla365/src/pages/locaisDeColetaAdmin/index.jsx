import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Modal, TextField, Button } from '@mui/material';

const ListaLocais = () => {
  const [locais, setLocais] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setLocalSelecionado(null);
    setModalAberto(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLocalSelecionado({
      ...localSelecionado,
      [name]: value,
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
      // Aqui você pode atualizar o estado 'locais' com os dados retornados, se necessário
      fecharModal();
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de edição */}
      <Modal open={modalAberto} onClose={fecharModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
          <Typography variant="h5" gutterBottom>Editar Local de Coleta</Typography>
          <TextField
            name="nome"
            label="Nome"
            value={localSelecionado ? localSelecionado.nome : ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="descricao"
            label="Descrição"
            value={localSelecionado ? localSelecionado.descricao : ''}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="identificadorUsuario"
            label="Identificador do Usuário"
            value={localSelecionado ? localSelecionado.identificadorUsuario : ''}
            onChange={handleInputChange}
            fullWidth
          />
          {/* Adicione outros campos aqui para rua, número, complemento, etc. */}
          <Button onClick={handleSalvarEdicao}>Salvar</Button>
          <Button onClick={fecharModal}>Cancelar</Button>
        </div>
      </Modal>
    </Container>
  );
};

export default ListaLocais;
