import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import RecyclingIcon from '@mui/icons-material/Recycling';

export default function ExternalLocaisDeColeta({ local }) {
  const renderIconButtons = (tiposResiduos) => {
    if (!tiposResiduos) return null;

    const colors = {
      metal: 'yellow',
      plastico: 'red',
      vidro: 'green',
      papel: 'blue',
      organico: 'brown',
      baterias: 'orange',
      polyestireno: 'grey'
    };

    const tiposAtivos = Object.entries(tiposResiduos)
      .filter(([_, ativo]) => ativo)
      .map(([tipo]) => tipo);

    return tiposAtivos.map((tipo, index) => (
      <IconButton
        key={tipo}
        aria-label={tipo}
        size="md"
        variant="solid"
        color="inherit"
        sx={{
          position: 'absolute',
          zIndex: 2,
          borderRadius: '50%',
          left: `${(index + 0.5) * 2.5}rem`,
          bottom: 0,
          transform: 'translateY(50%)',
          backgroundColor: colors[tipo],
        }}
      >
        <RecyclingIcon sx={{ color: '#fff' }} />
      </IconButton>
    ));
  };

  const getGoogleMapsUrl = (latitude, longitude) => {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  };

  return (
    <Card variant="outlined" sx={{ margin: { xs: '20px', md: 'auto' }, mb: 2 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://img.freepik.com/free-photo/recycle-sign-grass_23-2148576658.jpg?t=st=1715565955~exp=1715569555~hmac=1926104080632defe69bcb3922bb22fd19826f0079d944943ae6870f23483d60&w=740"
            srcSet="https://img.freepik.com/free-photo/recycle-sign-grass_23-2148576658.jpg?t=st=1715565955~exp=1715569555~hmac=1926104080632defe69bcb3922bb22fd19826f0079d944943ae6870f23483d60&w=740 2x"
            loading="lazy"
          />
        </AspectRatio>
        {renderIconButtons(local.tiposResiduos)}
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link href={getGoogleMapsUrl(local.latitude, local.longitude)} underline="none" target="_blank" rel="noopener noreferrer">
            {local.nome}
          </Link>
        </Typography>
        <Typography level="body-sm">
          {local.descricao}
        </Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs">
            Cadastrado por: {local.nomeUsuario}
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs">
            {`${local.rua}, ${local.numero}, ${local.bairro}, ${local.cidade}, ${local.estado}`}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
