import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HeaderWithProfileMenu from "../../components/header";

const defaultTheme = createTheme();

const CadastroColetas = () => {
  const [cepData, setCepData] = React.useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    latitude: "",
    longitude: "",
  });

  const obterIdentificadorUsuario = async () => {
    try {
      // Recupera os dados dos usuários do localStorage
      const usuariosString = localStorage.getItem("user");
      
      // Verifica se os dados dos usuários existem
      if (usuariosString) {
        
        // Converte a string JSON para um objeto
        const usuariosData = JSON.parse(usuariosString);
  
        // Extrai o CPF do objeto de usuário
        const cpf = usuariosData.cpf;
  
        // Retorna o CPF recuperado
        return cpf;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  
  const [identificadorUsuario, setIdentificadorUsuario] = React.useState("");
  
  React.useEffect(() => {
    // Obtém o identificador de usuário do localStorage
    obterIdentificadorUsuario().then((cpf) => {
      if (cpf !== null) {
        setIdentificadorUsuario(cpf);
      }
    });
  }, []);
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    // Verificar se pelo menos um tipo de resíduo foi selecionado
    const tiposResiduos = [
      data.get("vidro"),
      data.get("metal"),
      data.get("papel"),
      data.get("plastico"),
      data.get("organico"),
      data.get("baterias"),
      data.get("polyestireno"),
    ];

    if (tiposResiduos.every((residuo) => residuo !== "on")) {
      alert("Selecione pelo menos um tipo de resíduo.");
      return;
    }

    // Verificar se os campos obrigatórios estão preenchidos
    const inputs = form.querySelectorAll("input, select, textarea");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.required && !input.value.trim()) {
        isValid = false;
        input.reportValidity();
      }
    });

    if (!isValid) {
      return; // Não prosseguir com o envio do formulário se algum campo obrigatório estiver vazio
    }

    // Enviar os dados para o servidor
    try {
      const response = await axios.post(
        "http://localhost:5000/locaisDeColeta",
        {
          nome: data.get("nome"),
          descricao: data.get("descricao"),
          identificadorUsuario: data.get("identificadorUsuario"),
          rua: data.get("rua"),
          numero: data.get("numero"),
          complemento: data.get("complemento"),
          bairro: data.get("bairro"),
          cidade: data.get("cidade"),
          estado: data.get("estado"),
          latitude: data.get("latitude"),
          longitude: data.get("longitude"),
          tiposResiduos: {
            vidro: data.get("vidro") === "on",
            metal: data.get("metal") === "on",
            papel: data.get("papel") === "on",
            plastico: data.get("plastico") === "on",
            organico: data.get("organico") === "on",
            baterias: data.get("baterias") === "on",
            polyestireno: data.get("polyestireno") === "on",
          },
        }
      );

      console.log("Resposta do servidor:", response.data);
      alert("Local de coleta cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar local de coleta:", error);
      alert(
        "Ocorreu um erro ao cadastrar o local de coleta. Por favor, tente novamente."
      );
    }
  };

  // Função para obter latitude e longitude a partir do endereço
  const getLatLongFromAddress = async () => {
    try {
      const endereco = `${cepData.rua}, ${cepData.bairro}, ${cepData.cidade}, ${cepData.estado}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          endereco
        )}&format=jsonv2&limit=1&addressdetails=1`
      );
      const result = await response.json();

      if (result && result.length > 0) {
        setCepData({
          ...cepData,
          latitude: result[0].lat,
          longitude: result[0].lon,
        });
      } else {
        console.error("Endereço não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar latitude e longitude:", error);
    }
  };

  // Função para lidar com a mudança do CEP
  const handleCEPChange = (event) => {
    const cep = event.target.value.replace(/\D/g, "");
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            const address = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.uf}`;
            const encodedAddress = encodeURIComponent(address);
            const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}+&format=jsonv2&limit=1&addressdetails=1`;
            fetch(url)
              .then((response) => response.json())
              .then((addressData) => {
                if (addressData && addressData.length > 0) {
                  setCepData({
                    ...cepData,
                    rua: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    estado: data.uf,
                    latitude: addressData[0].lat,
                    longitude: addressData[0].lon,
                  });
                } else {
                  console.error("Endereço não encontrado.");
                }
              })
              .catch((error) => {
                console.error("Erro ao buscar latitude e longitude:", error);
              });
          } else {
            console.error("CEP não encontrado.");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dados do endereço:", error);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <HeaderWithProfileMenu />
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro de Local de Coleta
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="nome"
                  required
                  fullWidth
                  id="nome"
                  label="Nome do Local"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="descricao"
                  label="Descrição do Local"
                  name="descricao"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="identificadorUsuario"
                  label="Identificador do Usuário"
                  name="identificadorUsuario"
                  value={identificadorUsuario}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="cep"
                  label="CEP"
                  name="cep"
                  inputProps={{ minLength: 9, maxLength: 9 }}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    e.target.value = value.replace(/^(\d{5})(\d)/, "$1-$2");
                  }}
                  onBlur={handleCEPChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="rua"
                  label="Rua"
                  name="rua"
                  value={cepData.rua}
                  onChange={(event) =>
                    setCepData({ ...cepData, rua: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  required
                  fullWidth
                  id="numero"
                  label="Número"
                  name="numero"
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  fullWidth
                  id="complemento"
                  label="Complemento"
                  name="complemento"
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <TextField
                  required
                  fullWidth
                  id="bairro"
                  label="Bairro"
                  name="bairro"
                  value={cepData.bairro}
                  onChange={(event) =>
                    setCepData({ ...cepData, bairro: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="cidade"
                  label="Cidade"
                  name="cidade"
                  value={cepData.cidade}
                  onChange={(event) =>
                    setCepData({ ...cepData, cidade: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="estado"
                  label="Estado"
                  name="estado"
                  value={cepData.estado}
                  onChange={(event) =>
                    setCepData({ ...cepData, estado: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="latitude"
                  label="Latitude"
                  name="latitude"
                  value={cepData.latitude}
                  onChange={(event) =>
                    setCepData({ ...cepData, latitude: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  id="longitude"
                  label="Longitude"
                  name="longitude"
                  value={cepData.longitude}
                  onChange={(event) =>
                    setCepData({ ...cepData, longitude: event.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Tipos de Resíduos Aceitos</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="vidro" color="primary" />}
                  label="Vidro"
                />
                <FormControlLabel
                  control={<Checkbox name="metal" color="primary" />}
                  label="Metal"
                />
                <FormControlLabel
                  control={<Checkbox name="papel" color="primary" />}
                  label="Papel"
                />
                <FormControlLabel
                  control={<Checkbox name="plastico" color="primary" />}
                  label="Plástico"
                />
                <FormControlLabel
                  control={<Checkbox name="organico" color="primary" />}
                  label="Orgânico"
                />
                <FormControlLabel
                  control={<Checkbox name="baterias" color="primary" />}
                  label="Baterias"
                />
                <FormControlLabel
                  control={<Checkbox name="polyestireno" color="primary" />}
                  label="Poliestireno"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CadastroColetas;
