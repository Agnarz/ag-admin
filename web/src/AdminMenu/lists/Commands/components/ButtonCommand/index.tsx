import React, { useState } from 'react';
import { createStyles } from '@mantine/core';
import type { ButtonCommandProps } from '../../types';
import { fetchNui } from '../../../../../utils/fetchNui';
import { useNuiEvent } from '../../../../../hooks/useNuiEvent';
import { CommandLabel } from '../CommandLabel';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: 'min-content',
    width: '100%',
    overflowY: 'visible'
  },
  container: {
    color: 'white',
    background: theme.colors.ag[6],
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '2.75rem',
    borderRadius: 0,
    transition: 'all 0.2s ease',
    overflowX: 'hidden',
    ':hover': {
      background: theme.colors.ag[3],
      cursor: 'pointer'
    },
    paddingLeft: 8,
  }
}));

const ButtonCommand: React.FC<ButtonCommandProps> = ((props) => {
  const { classes } = useStyles();
  const { label, id, command, active, close, fav, setFav } = props;

  const handleClick = (e: any) => {
    e.stopPropagation();
    fetchNui('triggerCommand', command);
  };

  const [isActive, setActive] = useState<boolean>(false);
  useNuiEvent<boolean>(`setActive:${command}`, (data) => {
    if (!active) return;
    setActive(data);
    if (close) { fetchNui('closeMenu'); }
  });

  const activeStyle = {
    borderRight: isActive? '6px solid #0a8543' : ''
  };

  return (
    <div className={classes.root}>
      <div className={classes.container} style={activeStyle} onClick={handleClick}>
        <CommandLabel command_id={id} fav={fav} setFav={setFav}>
          {label}
        </CommandLabel>
      </div>
    </div>
  );
});

export default ButtonCommand;
