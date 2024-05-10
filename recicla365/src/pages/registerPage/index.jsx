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
import DrawerAppBar from "../../components/externalHeader";
import LabelBottomNavigation from "../../components/footer";

function SignUp() {
  // State para armazenar os dados do CEP
  const [cepData, setCepData] = useState({
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  // State para armazenar os erros do formulário
  const [formErrors, setFormErrors] = useState({});

  // State para armazenar o gênero selecionado
  const [genero, setGenero] = useState("");

  // State para controlar se há erro no CPF
  const [cpfError, setCpfError] = useState(false);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Realizando validações...");

    const formData = new FormData(event.currentTarget);
    //Validação do email
    const email = formData.get("email");
    if (!validateEmail(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Por favor, insira um email válido",
      }));
      return;
    }
    //Validação da senha
    const senha = formData.get("senha");
    if (!validatePassword(senha)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        senha:
          "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 número",
      }));
      return;
    }
    console.log("Formulário válido.");
    console.log("Dados do formulário:", formData);

    // Validação dos campos obrigatórios
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
      if (!formData.get(fieldName)) {
        errors[fieldName] = "Campo obrigatório";
        hasErrors = true;
      }
    });
  
    if (hasErrors) {
      console.log("Campos obrigatórios não preenchidos:", errors);
      setFormErrors(errors);
      return;
    }

    //Validação do CPF para cadastro
    const cpf = formData.get("cpf");
    console.log("Verificando se o CPF já existe:", cpf);
    const cpfExists = await checkCpfExists(cpf);
    console.log(cpfExists);

    if (cpfExists) {
      setCpfError(true);
      console.log("Já existe um cadastro com esse CPF.");
      window.alert("Já existe um cadastro com esse CPF.");
      return;
    }
    //Envio dos dados para o servidor
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
          genero: genero || "",
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
      window.alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }

    console.log("Formulário válido. Enviando dados para o servidor...");
  };

  const checkCpfExists = async (cpf) => {
    try {
      const response = await fetch(`http://localhost:5000/usuarios?cpf=${cpf}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
      }
      const data = await response.json();
      return data.length > 0;
    } catch (error) {
      console.error("Erro ao verificar CPF:", error);
      return true;
    }
  };

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));

    if (fieldName === "genero") {
      setGenero(fieldValue);
    } else if (fieldName === "cpf") {
      setCpfError(false);
    } else if (fieldName === "cep") {
      setCepData({
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
      });
    }
  };

  const handleBlur = (fieldName) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };

  //VALIDA CEP - ViaCEP
  const checkCEP = (event) => {
    const cep = event.target.value.replace(/\D/g, "");
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

  //BLOCOS DO FORMULÁRIO
  return (
    <ThemeProvider theme={createTheme()}>
      <DrawerAppBar />
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
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                    inputProps={{ minLength: 14, maxLength: 14 }}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      e.target.value = value
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                      handleChange(e); // Adicione esta linha para validar o campo CPF
                    }}
                    error={formErrors.cpf && true}
                    helperText={
                      (cpfError &&
                        "Já existe um usuário cadastrado com esse CPF") ||
                      (formErrors.cpf && "Por favor, insira um CPF válido")
                    }
                    onBlur={handleBlur}
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
                    <InputLabel id="genero-label">Gênero *</InputLabel>
                    <Select
                      labelId="genero-label"
                      id="genero"
                      value={genero}
                      onChange={(event) => setGenero(event.target.value)}
                      label="Gênero *"
                      name="genero"
                      required
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
                    inputProps={{minLength: 9, maxLength: 9 }}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      e.target.value = value.replace(/^(\d{5})(\d)/, "$1-$2");
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
                    autoComplete="cidade"
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
                    autoComplete="estado"
                    value={cepData.estado}
                    onChange={(event) =>
                      setCepData({ ...cepData, estado: event.target.value })
                    }
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
                      (formErrors.email &&
                        "Por favor, insira um email válido") ||
                      " "
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                      (formErrors.senha &&
                        "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 número") ||
                      " "
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                      (formErrors.confirmaSenha && "A senha não coincide") ||
                      " "
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
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
      <LabelBottomNavigation />
    </ThemeProvider>
  );
}

//Regex para email
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

//Regex para senha
function validatePassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
}

export default SignUp;
