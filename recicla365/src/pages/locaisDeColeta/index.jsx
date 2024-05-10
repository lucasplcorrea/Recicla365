import * as React from "react";
import DrawerAppBar from "../../components/externalHeader";
import LabelBottomNavigation from "../../components/footer";
import ExternalLocaisDeColeta from "../../components/externalCards/externalLocaisDeColeta";

export default function LocaisDeColeta() {
  return (
    <div>
      <DrawerAppBar title="Locais de Coleta" />
      <h1>Locais de Coleta</h1>
      <ExternalLocaisDeColeta />
      <LabelBottomNavigation value="locaisDeColeta" />
    </div>
  );
}