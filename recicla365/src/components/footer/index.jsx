import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MapIcon from "@mui/icons-material/Map";
import { Divider } from "@mui/material";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Divider />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Login"
            value="login"
            icon={<LockIcon />}
          />
          <BottomNavigationAction
            label="Cadastro"
            value="cadastro"
            icon={<PersonAddIcon />}
          />
          <BottomNavigationAction
            label="Pontos de Coletas"
            value="coletas"
            icon={<MapIcon />}
          />
        </BottomNavigation>
      </div>
    </>
  );
}
