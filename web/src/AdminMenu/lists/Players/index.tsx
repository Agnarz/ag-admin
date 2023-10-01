import React, { useState, useMemo } from 'react';
import { DataList } from '../../components/DataList';
import { PlayerProps } from '../../../types';
import Player from './components/Player';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { usePlayers } from '../../../state/players';

export const PlayersList: React.FC = () => {
  const [players, setPlayers] = usePlayers();
  useNuiEvent('setPlayers', setPlayers);

  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const searchedPlayers = useMemo(() => {
    if (search.length > 0) {
      return players.filter((v) => v.label.toLowerCase().includes(search.toLowerCase()));
    } else {
      return players;
    }
  }, [players, search]);

  const context = {
    list: 'players',
    filter: filter,
    filters: [
      { label: 'All', value: 'all' },
    ],
    setFilter: setFilter,
    search: search,
    setSearch: setSearch,
  }

  return (
    <DataList context={context}>
      {searchedPlayers.map((v, index) => (
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
