import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import mapsImage from "../../../public/img/vectors/maps.svg";

const cardStyle = {
  marginTop: "20px",
};

const imageStyle = {
  objectFit: "contain",
  width: "100%",
  marginTop: "20px",
};

export default function CardLocais() {
  const [totalLocais, setTotalLocais] = React.useState(0); // Estado para armazenar o total de locais cadastrados

  React.useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await fetch("http://localhost:5000/locaisDeColeta");
        const data = await response.json();
        setTotalLocais(data.length); // Define o total de locais com base no comprimento da resposta
      } catch (error) {
        console.error("Erro ao buscar locais de coleta:", error);
      }
    };

    fetchLocais();
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
            Locais Cadastrados: {totalLocais}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Clique aqui para ver os locais de coleta cadastrados.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Locais
        </Button>
      </CardActions>
    </Card>
  );
}
