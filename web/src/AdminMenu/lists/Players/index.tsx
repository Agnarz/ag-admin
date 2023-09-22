import React, { useState } from "react";
import DataList from "../../components/DataList";
import type { PlayerProps } from "./types";
import Player from "./components/Player";
import { useNuiEvent } from "../../../hooks/useNuiEvent";

const PlayersList: React.FC = () => {
  const [players, setPlayers] = useState<PlayerProps[]>([]);

  useNuiEvent("setPlayers", setPlayers);
  return (
    <DataList>
      {players.map((v, index) => (
        <React.Fragment key={index}>
          <Player
            source={v.source}
            headshot={v.headshot}
            label={v.label}
          />
        </React.Fragment>
      ))}
    </DataList>
  );
};

export default PlayersList;
