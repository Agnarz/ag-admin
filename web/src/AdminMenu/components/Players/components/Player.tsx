import React, { useState } from 'react';
import { createStyles, Button, Divider, Stack, Group, Collapse } from '@mantine/core';
import type { PlayerProps } from '../types';
import { fetchNui } from '../../../../utils/fetchNui';

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'min-content',
    overflowY: 'visible',
  },
  header: {
    color: 'white',
    background: theme.colors.ag[6],
    position: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    height: '3rem',

    alignItems: 'center',
    overflowX: 'hidden',
    transition: 'all 0.2s ease',
    borderRadius: 0,
    ':hover': {
      background: theme.colors.ag[3],
      cursor: 'pointer',
    },
  },
  label: {
    paddingLeft: 8,
    position: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 14,
    textAlign: 'left',
    overflow: 'hidden',
  },
  expandIcon: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    right: 12,
    paddingRight: 8,
  },
  expand: {
    background: theme.colors.ag[5],
    position: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'left',
    alignContent: 'center',
    padding: 12,
    gap: 6,
  },
  headshot: {
    position: 'inherit',
    height: '100%',
  }
}));

const Player: React.FC<PlayerProps> = ((props) => {
  const { classes } = useStyles();
  const { source, label, headshot } = props;
  const [isExpanded, setExpand] = useState<boolean>(false);

  const handleClick = () => {
    setExpand(!isExpanded);
  };

  const expandedStyle = {
    background: isExpanded ? '#1864AB' : '',
    color: isExpanded ? 'white' : '',
  };

  const expandIcon = {
    transform: isExpanded ? 'rotate(-180deg)' : '',
    transition: 'all 0.2s ease',
    fontSize: 14,
  };

  const triggerCommand = (command: string) => {
    fetchNui('triggerCommand', `${command} ${source}`);
  };

  return (
    <div className={classes.container}>

      <div className={classes.header} style={expandedStyle}>
        <div className={classes.expandIcon}>
          <i className='fas fa-chevron-down' style={expandIcon} />
        </div>
        <img
          className={classes.headshot}
          src={`https://nui-img/${headshot}/${headshot}?v=${Date.now()}`}
        />
        <div className={classes.label} onClick={handleClick}>
          {label}
        </div>
      </div>

      <Collapse transitionDuration={200} in={isExpanded}>
        <div className={classes.expand}>
          <Group spacing='xs'>
            <Button variant='light' color='blue' onClick={() => {triggerCommand('revive')}}>
              Revive
            </Button>
            <Button variant='light' color='red' onClick={() => {triggerCommand('kill')}}>
              Kill
            </Button>
            <Button variant='light' color='red' onClick={() => {triggerCommand('kick')}}>
              Kick
            </Button>
            <Button variant='light' color='red' onClick={() => {triggerCommand('ban')}}>
              Ban
            </Button>
          </Group>
        </div>

      </Collapse>

    </div>
  );
});

export default Player;