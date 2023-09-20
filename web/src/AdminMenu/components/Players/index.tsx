import React, { useState } from 'react';
import { createStyles } from '@mantine/core';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import type { PlayerProps } from './types';
import Player from './components/Player';

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

const PlayersList: React.FC = () => {
  const { classes } = useStyles();
  const [players, setPlayers] = useState<PlayerProps[]>([]);
  useNuiEvent('setPlayers', setPlayers);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.list}>

        </div>
      </div>
    </div>
  );
};

export default PlayersList;