import React, { useState } from 'react';
import { createStyles, ActionIcon, Tooltip, Menu } from '@mantine/core';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';

interface QuickActionProps {
  command: string;
  icon: string;
  type: string;
  items?: Array<{ label: string; command: string; }>;
  active?: boolean;
};

const useStyles = createStyles((theme) => ({
  button: {
    background: theme.colors.ag[8] + 'f2',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    transition: 'all 0.25s ease',
    ':hover': {
      background: theme.colors.ag[2],
      cursor: 'pointer'
    }
  }
}));

const QuickAction: React.FC<QuickActionProps> = (props) => {
  const { classes } = useStyles();
  const { command, icon, type, active, items } = props;

  const handleClick = (action: any) => {
    fetchNui('triggerCommand', action);
  };

  // eg. setActive:dev
  const [isActive, setActive] = useState(false);
  const activeEvent = 'setActive:' + command;
  useNuiEvent<boolean>(activeEvent, (data) => {
    if (!active) return;
    setActive(data);
  });

  const activeStyle = {
    background: isActive? '#2f9e4499' : '',
    color: isActive? '#b2f2bb': '',
  };

  return (
    <>
      {type === 'button' && (
        <Tooltip label={command} position='left' withArrow>
          <ActionIcon className={classes.button} size={42} style={activeStyle} onClick={() => handleClick(command)}>
            <i style={{ fontSize: 18 }} className={icon}  />
          </ActionIcon>
        </Tooltip>
      )}

      {type === 'menu' && (
        <Menu position="left-start" withArrow shadow="md" width={200} trigger="hover" openDelay={100} closeDelay={250}>
            <Menu.Target>
              <ActionIcon className={classes.button} size={42}>
                <i style={{ fontSize: 18 }} className={icon}  />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Copy Coords</Menu.Label>
              {items?.map((item, index) => (
                <React.Fragment key={index}>
                  <Menu.Item  onClick={() => handleClick(item.command)}>
                    {item.label}
                  </Menu.Item>
                </React.Fragment>
              ))}
            </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
};

export default QuickAction;
