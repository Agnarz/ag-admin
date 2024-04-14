import { useState } from "react";
import type { ButtonCommandProps } from "../../../../../types";
import { fetchNui } from "../../../../../utils/fetchNui";
import { useNuiEvent } from "../../../../../hooks/useNuiEvent";
import { CommandLabel } from "../CommandLabel";


const ButtonCommand: React.FC<ButtonCommandProps> = ((props) => {
  const { label, id, command, active, close, fav, setFav } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    e.stopPropagation();
    fetchNui("triggerCommand", command);
  };

  const [isActive, setActive] = useState<boolean>(false);
  useNuiEvent<boolean>(`setActive:${command}`, (data) => {
    if (!active) return;
    setActive(data);
    if (close) { fetchNui("closeMenu"); }
  });

  const activeStyle = {
    background: isActive? "#2f9e4499" : "",
  };

  return (
    <div className="ButtonCommand-root">
      <div className="ButtonCommand-container" style={activeStyle} onClick={handleClick}>
        <CommandLabel command_id={id} fav={fav} setFav={setFav}>
          {label}
        </CommandLabel>
      </div>
    </div>
  );
});

export default ButtonCommand;
