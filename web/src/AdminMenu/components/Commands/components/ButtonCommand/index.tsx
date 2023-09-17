import React, { useState } from 'react';
import { createStyles } from '@mantine/core';
import { fetchNui } from '../../../../../utils/fetchNui';
import { useNuiEvent } from '../../../../../hooks/useNuiEvent';
import type { ButtonCommandProps } from '../../types';

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
    height: '2.25rem',
    padding: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 0,
    transition: 'all 0.2s ease',
    overflowX: 'hidden',
    ':hover': {
      background: theme.colors.ag[3],
      cursor: 'pointer'
    }
  },
  label: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    fontWeight: 500,
    fontSize: 14,
    textAlign: 'left',
    overflow: 'hidden'
  }
}));

const ButtonCommand: React.FC<ButtonCommandProps> = ((props) => {
  const { classes } = useStyles();
  const { label, command, active } = props;

  const handleClick = () => {
    fetchNui('triggerCommand', command);
  };

  const [isActive, setActive] = useState<boolean>(false);
  useNuiEvent<boolean>(`setActive:${command}`, (data) => {
    if (!active) return;
    setActive(data);
  });

  const activeStyle = {
    borderRight: isActive? '6px solid #0a8543' : ''
  };

  return (
    <div className={classes.root}>
      <div className={classes.container} style={activeStyle}>
        <div className={classes.label} onClick={handleClick}>
          {label}
        </div>
      </div>
    </div>
  );
});

export default ButtonCommand;
