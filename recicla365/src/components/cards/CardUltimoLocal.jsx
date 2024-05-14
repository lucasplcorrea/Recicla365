import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import mapsImage from "../../../public/img/vectors/point.svg";

const cardStyle = {
  marginTop: "20px",
};

const imageStyle = {
  objectFit: "contain",
  width: "100%",
  marginTop: "20px",
};

export default function CardUltimoLocal() {
  const [ultimoLocal, setUltimoLocal] = React.useState(""); // Estado para armazenar o nome do último local cadastrado

  React.useEffect(() => {
    const fetchUltimoLocal = async () => {
      try {
        const response = await fetch("http://localhost:5000/locaisDeColeta");
        const data = await response.json();
        if (data.length > 0) {
          const ultimoLocalCadastrado = data[data.length - 1].nome; // Obtém o nome do último local cadastrado
          setUltimoLocal(ultimoLocalCadastrado); // Define o nome do último local no estado
        }
      } catch (error) {
        console.error("Erro ao buscar último local cadastrado:", error);
      }
    };

    fetchUltimoLocal();
  }, []);

  return (
    <Card style={cardStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="70"
          height="70"
          image={mapsImage}
          alt="Google Maps"
          style={imageStyle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Último Local Cadastrado:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ultimoLocal}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/pontos-cadastrados">
          Locais
        </Button>
      </CardActions>
    </Card>
  );
}
