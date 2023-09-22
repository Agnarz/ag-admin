import React, { forwardRef } from 'react';
import { Button, Group } from '@mantine/core';
import type { PlayerProps } from '../types';
import Expand from '../../../components/Expand';
import { fetchNui } from '../../../../utils/fetchNui';

const Player: React.FC<PlayerProps> = forwardRef((props) => {
  const { source, label, headshot } = props;

  const triggerCommand = (command: string) => {
    fetchNui('triggerCommand', `${command} ${source}`);
  };

  const headshotStyle: React.CSSProperties = {
    position: 'inherit',
    height: '100%',
    left: -8
  };
  const headshotString = `https://nui-img/${headshot}/${headshot}?v=${Date.now()}`;

  return (
    <Expand label={
      <>
        <img style={headshotStyle} src={headshotString} />
        {label}
      </>
    }>
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
    </Expand>
  );
});

export default Player;