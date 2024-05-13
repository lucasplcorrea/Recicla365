import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MapIcon from "@mui/icons-material/Map";
import { Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function LabelBottomNavigation() {
  const location = useLocation(); // Obtendo a localização atual da página
  const [value, setValue] = React.useState("home");

  React.useEffect(() => {
    // Atualizando o valor do footer com base na localização atual
    switch (location.pathname) {
      case "/":
        setValue("home");
        break;
      case "/login":
        setValue("login");
        break;
      case "/cadastro":
        setValue("cadastro");
        break;
      case "/locais-de-coleta":
        setValue("coletas");
        break;
      default:
        setValue("home");
    }
  }, [location]);

  return (
    <>
      <Divider />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Login"
            value="login"
            icon={<LockIcon />}
            component={Link}
            to="/login"
          />
          <BottomNavigationAction
            label="Cadastro"
            value="cadastro"
            icon={<PersonAddIcon />}
            component={Link}
            to="/cadastro"
          />
          <BottomNavigationAction
            label="Coletas"
            value="coletas"
            icon={<MapIcon />}
            component={Link}
            to="/locais-de-coleta"
          />
        </BottomNavigation>
      </div>
    </>
  );
}
