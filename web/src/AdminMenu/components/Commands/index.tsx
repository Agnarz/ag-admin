import React, { useState } from 'react';
import { createStyles } from '@mantine/core';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import type { CommandProps } from './types';
import ButtonCommand from './components/ButtonCommand';

const useStyles = createStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'hidden'
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  list: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: 12,
    gap: 4
  }
}));

const CommandList: React.FC = () => {
  const { classes } = useStyles();
  const [commands, setCommands] = useState<CommandProps[]>([]);
  useNuiEvent('setCommands', setCommands);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.list}>
          {commands.map((v, index) => (
            <React.Fragment key={index}>
              {v.type == 'button' && (
                <ButtonCommand
                  id={index}
                  label={v.label}
                  command={v.command}
                  type={v.type}
                  active={v.active}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandList;
