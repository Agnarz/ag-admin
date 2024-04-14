import { useState, Fragment } from "react";
import { ActionIcon, Tooltip, Menu } from "@mantine/core";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { fetchNui } from "../../utils/fetchNui";
import { QuickActionProps } from "../../types";

const QuickAction: React.FC<QuickActionProps> = (props) => {
  const { command, icon, type, close, active, items } = props;

  const handleClick = (action: unknown) => {
    fetchNui("triggerCommand", action);
    if (close) fetchNui("closeMenu");
  };

  // eg. setActive:dev
  const [isActive, setActive] = useState(false);
  const activeEvent = `setActive:${command}`;
  useNuiEvent<boolean>(activeEvent, (data) => {
    if (!active) return;
    setActive(data);
  });

  const activeStyle = {
    background: isActive? "#2f9e4499" : "",
    color: isActive? "#b2f2bb": "",
  };

  return (
    <>
      {type === "button" && (
        <Tooltip label={command} position="left" withArrow>
          <ActionIcon className="QuickAction-button" size={42} style={activeStyle} onClick={() => handleClick(command)}>
            <i style={{ fontSize: 18 }} className={icon}  />
          </ActionIcon>
        </Tooltip>
      )}

      {type === "menu" && (
        <Menu position="left-start" withArrow shadow="md" width={200} trigger="hover" openDelay={100} closeDelay={250}>
          <Menu.Target>
            <ActionIcon className="QuickAction-button" size={42}>
              <i style={{ fontSize: 18 }} className={icon}  />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Copy Coords</Menu.Label>
            {items?.map((item, index) => (
              <Fragment key={index}>
                <Menu.Item  onClick={() => handleClick(item.command)}>
                  {item.label}
                </Menu.Item>
              </Fragment>
            ))}
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
};

export default QuickAction;
