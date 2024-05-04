import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

function SignUp() {
  const [cepData, setCepData] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [genero, setGenero] = useState("");
  const [cpfError, setCpfError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Formulário enviado...");

    const formData = new FormData(event.currentTarget);

    // Validar email
    const email = formData.get("email");
    if (!validateEmail(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Por favor, insira um email válido",
      }));
      return;
    }

    // Validar senha
    const senha = formData.get("senha");
    if (!validatePassword(senha)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        senha:
          "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 número",
      }));
      return;
    }

    console.log("Dados do formulário:", formData);

    // Verifica se todos os campos obrigatórios estão preenchidos
    const requiredFields = [
      "nome",
      "cpf",
      "dataDeNascimento",
      "genero",
      "cep",
      "rua",
      "numero",
      "bairro",
      "cidade",
      "estado",
      "email",
      "senha",
      "confirmaSenha",
    ];
    const errors = {};
    let hasErrors = false;

    requiredFields.forEach((fieldName) => {
      if (!formData.get(fieldName) && fieldName !== "genero") {
        errors[fieldName] = "Campo obrigatório";
        hasErrors = true;
      }
    });

    if (hasErrors) {
      console.log("Campos obrigatórios não preenchidos:", errors);
      setFormErrors(errors);
      return;
    }

    // Verifica se já existe um usuário com o mesmo CPF
    const cpf = formData.get("cpf");
    console.log("Verificando se o CPF já existe:", cpf);
    const cpfExists = await checkCpfExists(cpf);
    console.log("CPF existe?", cpfExists);

    if (cpfExists) {
      setCpfError(true);
      console.log("CPF já existe.");
      return;
    }

    // Enviar dados para o servidor para cadastro
    try {
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.get("nome"),
          cpf: formData.get("cpf"),
          dataDeNascimento: formData.get("dataDeNascimento"),
          genero: formData.get("genero"),
          cep: formData.get("cep"),
          rua: formData.get("rua"),
          numero: formData.get("numero"),
          complemento: formData.get("complemento"),
          bairro: formData.get("bairro"),
          cidade: formData.get("cidade"),
          estado: formData.get("estado"),
          email: formData.get("email"),
          senha: formData.get("senha"),
        }),
      });
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      console.log("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }

    // Se tudo estiver correto, envia os dados para o servidor para cadastro
    console.log("Formulário válido. Enviando dados para o servidor...");
  };

  const checkCpfExists = async (cpf) => {
    try {
      const response = await fetch(`http://localhost:5000/usuarios?cpf=${cpf}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
      }
      const data = await response.json();
      return data.length > 0; // Retorna true se o CPF já existe, false caso contrário
    } catch (error) {
      console.error("Erro ao verificar CPF:", error);
      return true; // Retorna true para indicar um erro na verificação
    }
  };

  const handleChange = (event) => {
    setGenero(event.target.value);
  };

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
                    error={formErrors.nome && true}
                    helperText={
                      formErrors.nome && "Por favor, preencha seu nome"
                    }
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
                    error={cpfError}
                    helperText={
                      cpfError && "Já existe um usuário cadastrado com esse CPF"
                    }
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
                    sx={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormControl fullWidth error={formErrors.genero && true}>
                    <InputLabel id="genero-label">Gênero</InputLabel>
                    <Select
                      labelId="genero-label"
                      id="genero"
                      value={genero}
                      onChange={handleChange}
                      label="Gênero"
                    >
                      <MenuItem value={"Masculino"}>Masculino</MenuItem>
                      <MenuItem value={"Feminino"}>Feminino</MenuItem>
                      <MenuItem value={"Outros"}>Outros</MenuItem>
                    </Select>
                    {formErrors.genero && (
                      <FormHelperText>{formErrors.genero}</FormHelperText>
                    )}
                  </FormControl>
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
                    onChange={(event) =>
                      setCepData({ ...cepData, rua: event.target.value })
                    } // Atualiza o estado local
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
                    onChange={(event) =>
                      setCepData({ ...cepData, bairro: event.target.value })
                    } // Atualiza o estado local
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
                    onChange={(event) =>
                      setCepData({ ...cepData, cidade: event.target.value })
                    } // Atualiza o estado local
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
                    onChange={(event) =>
                      setCepData({ ...cepData, estado: event.target.value })
                    } // Atualiza o estado local
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
                    error={formErrors.email && true}
                    helperText={
                      formErrors.email && "Por favor, insira um email válido"
                    }
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
                    error={formErrors.senha && true}
                    helperText={
                      formErrors.senha &&
                      "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 número"
                    }
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
                    error={formErrors.confirmaSenha && true}
                    helperText={
                      formErrors.confirmaSenha && "A senha não coincide"
                    }
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

function validateEmail(email) {
  // Implemente sua lógica de validação de email aqui
  return /\S+@\S+\.\S+/.test(email);
}

function validatePassword(password) {
  // Implemente sua lógica de validação de senha aqui
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
}

export default SignUp;
