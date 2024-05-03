import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ptBR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pt-br";

function SignUp() {
  const [cepData, setCepData] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      nome: formData.get("name"),
      genero: formData.get("gender"),
      cpf: formData.get("cpf"),
      dataDeNascimento: formData.get("dataDeNascimento"),
      cep: formData.get("cep"),
      rua: formData.get("rua"),
      numero: formData.get("numero"),
      complemento: formData.get("complemento"),
      bairro: formData.get("bairro"),
      cidade: formData.get("cidade"),
      estado: formData.get("estado"),
      email: formData.get("email"),
      senha: formData.get("senha"),
      confirmaSenha: formData.get("confirmaSenha"),
    });
    // Aqui você pode adicionar a lógica para enviar os dados para o servidor
  };

  //checkCEP

  const checkCEP = (event) => {
    const cep = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length !== 8) {
      alert("CEP inválido");
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado");
          return;
        }

        setCepData({
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="pt-br"
        localeText={
          ptBR.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
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
              Registro
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
                    label="Nome Completo"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    fullWidth
                    id="cpf"
                    label="CPF"
                    name="cpf"
                    autoComplete="cpf"
                    inputProps={{ maxLength: 14 }} // Limita o tamanho do campo CPF
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                      e.target.value = value
                        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto após o terceiro dígito
                        .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto após o sexto dígito
                        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona hífen após o nono dígito
                    }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <DatePicker
                    required
                    fullWidth
                    id="dataDeNascimento"
                    label="Data de Nascimento"
                    name="dataDeNascimento"
                    autoComplete="dataDeNascimento"
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ width: '100%' }} 
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    fullWidth
                    id="genero"
                    label="Gênero"
                    name="genero"
                    autoComplete="genero"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    fullWidth
                    id="cep"
                    label="CEP"
                    name="cep"
                    autoComplete="cep"
                    inputProps={{ maxLength: 9 }} // Limita o tamanho do campo CEP
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
                      e.target.value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após o quinto dígito
                    }}
                    onBlur={checkCEP}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="rua"
                    label="Rua"
                    name="rua"
                    autoComplete="rua"
                    value={cepData.rua} // Valor do estado local
                    onChange={(event) => setCepData({ ...cepData, rua: event.target.value })} // Atualiza o estado local
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    required
                    fullWidth
                    id="numero"
                    label="Número"
                    name="numero"
                    autoComplete="numero"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    fullWidth
                    id="complemento"
                    label="Complemento"
                    name="complemento"
                    autoComplete="complemento"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <TextField
                    required
                    fullWidth
                    id="bairro"
                    label="Bairro"
                    name="bairro"
                    autoComplete="bairro"
                    value={cepData.bairro} // Valor do estado local
                    onChange={(event) => setCepData({ ...cepData, bairro: event.target.value })} // Atualiza o estado local
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    fullWidth
                    id="cidade"
                    label="Cidade"
                    name="cidade"
                    autoComplete="cidade"
                    value={cepData.cidade} // Valor do estado local
                    onChange={(event) => setCepData({ ...cepData, cidade: event.target.value })} // Atualiza o estado local
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    fullWidth
                    id="estado"
                    label="Estado"
                    name="estado"
                    autoComplete="estado"
                    value={cepData.estado} // Valor do estado local
                    onChange={(event) => setCepData({ ...cepData, estado: event.target.value })} // Atualiza o estado local
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    fullWidth
                    name="senha"
                    label="Senha"
                    type="password"
                    id="senha"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <TextField
                    required
                    fullWidth
                    name="confirmaSenha"
                    label="Confirme sua Senha"
                    type="password"
                    id="confirmaSenha"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastre-se
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Já possui uma conta? Faça login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default SignUp;
