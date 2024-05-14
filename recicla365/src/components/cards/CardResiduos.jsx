import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  textAlign: "center",
}));

const iconStyle = {
  width: "50px",
  height: "50px",
  margin: "auto",
};

export default function CardContadorLocais() {
  const [contadorResiduos, setContadorResiduos] = React.useState({});

  React.useEffect(() => {
    const fetchLocaisDeColeta = async () => {
      try {
        const response = await fetch("http://localhost:5000/locaisDeColeta");
        if (!response.ok) {
          throw new Error("Erro ao obter os locais de coleta");
        }
        const data = await response.json();
        const contador = {};

        data.forEach((local) => {
          for (const tipoResiduo in local.tiposResiduos) {
            if (local.tiposResiduos[tipoResiduo]) {
              contador[tipoResiduo] = (contador[tipoResiduo] || 0) + 1;
            }
          }
        });

        setContadorResiduos(contador);
      } catch (error) {
        console.error("Erro ao buscar os dados dos locais de coleta:", error);
      }
    };

    fetchLocaisDeColeta();
  }, []);

  return (
    <Card sx={{ marginTop: "20px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="center">
          Quantidade de Locais de Coleta por Tipo de Resíduo
        </Typography>
        <Grid container spacing={1} justifyContent="center"> {/* Ajuste aqui */}
          {Object.entries(contadorResiduos).map(([tipoResiduo, quantidade]) => (
            <Grid key={tipoResiduo} item xs={4} sm={2} md={1}>
              <StyledPaper elevation={3}>
                <img
                  src={`../../../public/img/residuos/${tipoResiduo}.svg`}
                  alt={tipoResiduo}
                  style={iconStyle}
                />
                <Typography variant="body2" color="text.secondary" align="center">
                  {quantidade}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {tipoResiduo.charAt(0).toUpperCase() + tipoResiduo.slice(1)}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
