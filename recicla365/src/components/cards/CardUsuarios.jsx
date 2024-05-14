import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import userImage from "../../../public/img/vectors/users.svg";

const cardStyle = {
  marginTop: "20px",
};

const imageStyle = {
  objectFit: "contain",
  width: "100%",
  marginTop: "20px",
};

export default function CardUsuarios() {
  const [totalUsuarios, setTotalUsuarios] = React.useState(0); // Estado para armazenar o total de usuários cadastrados

  React.useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:5000/usuarios");
        const data = await response.json();
        setTotalUsuarios(data.length); // Define o total de usuários com base no comprimento da resposta
      } catch (error) {
        console.error("Erro ao buscar usuários cadastrados:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <Card style={cardStyle}>
      <CardActionArea>
        <CardMedia
          component="img"
          width="70"
          height="70"
          image={userImage}
          alt="Usuários"
          style={imageStyle}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Usuários Cadastrados: {totalUsuarios}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Clique aqui para ver os usuários cadastrados
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/usuarios-cadastrados">
          Usuários
        </Button>
      </CardActions>
    </Card>
  );
}
