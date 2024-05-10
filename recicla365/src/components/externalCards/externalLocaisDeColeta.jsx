import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import RoomIcon from "@mui/icons-material/Room";
import RecyclingIcon from "@mui/icons-material/RecyclingSharp";

const materiais = {
  papel: { nome: "Papel", cor: "#007bff" },
  bateria: { nome: "Baterias", cor: "#ff7700" },
  vidro: { nome: "Vidro", cor: "#28a745" },
  metal: { nome: "Metal", cor: "#ffc107" },
  plastico: { nome: "Plástico", cor: "#dc3545" },
  poliestireno: { nome: "Poliestireno", cor: "#808080" },
  organico: { nome: "Orgânico", cor: "#8a2be2" },
};

export default function MultipleInteractionCard() {
  const [locaisDeColeta, setLocaisDeColeta] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/locaisDeColeta")
      .then((response) => {
        setLocaisDeColeta(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!locaisDeColeta.length) return <div>Carregando...</div>;

  return locaisDeColeta.map((local) => (
    <Card variant="outlined" key={local.id} sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={local.imagem} // Substitua por 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318'
            srcSet={local.imagem + " 2x"} // Substitua por 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x'
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <IconButton
          aria-label="Like minimal photography"
          size="md"
          variant="solid"
          color="danger"
          sx={{
            position: "absolute",
            zIndex: 2,
            borderRadius: "50%",
            right: "1rem",
            bottom: 0,
            transform: "translateY(50%)",
          }}
        >
          <RoomIcon />
        </IconButton>
      </CardOverflow>

      <CardContent>
        <Typography level="title-md">
          <Link href={local.link} overlay underline="none">
            {local.nome}
          </Link>
        </Typography>
        <Typography level="body-sm">
          <Link href={local.link}>{local.descricao}</Link>
        </Typography>
      </CardContent>

      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">Por: {local.usuario}</Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">{local.endereco}</Typography>
        </CardContent>
      </CardOverflow>

      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-md">Materiais Aceitos:</Typography>
          {Object.keys(materiais).map((tipoMaterial) => (
            <div key={tipoMaterial}>
              <IconButton
                aria-label={materiais[tipoMaterial].nome}
                size="sm"
                variant="outlined"
                color={materiais[tipoMaterial].cor}
                sx={{ marginRight: "1rem" }}
              >
                <RecyclingIcon />
              </IconButton>
              <Typography level="body-sm">
                {materiais[tipoMaterial].nome}
              </Typography>
            </div>
          ))}
        </CardContent>
      </CardOverflow>
    </Card>
  ));
}
