import React, { useState, useMemo } from 'react';
import type { CommandProps } from './types';
import { DataList } from '../../components/DataList';
import ButtonCommand from './components/ButtonCommand';
import FormCommand from './components/FormCommand';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { fetchNui } from '../../../utils/fetchNui';

export const CommandsList: React.FC = () => {
  const [commands, setCommands] = useState<CommandProps[]>([]);
  useNuiEvent<CommandProps[]>('setCommands', (data) => {
    data.forEach((v, index) => {
      v.id = index + 1;
    });
    setCommands(data);
  });

  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const sortedCommands = useMemo(() => {
    return commands.sort((a, b) => {
      if (a.fav && !b.fav) return -1;
      if (!a.fav && b.fav) return 1;
      if (a.id < b.id) {return -1;}
      if (a.id > b.id) {return 1;}
      return 0;
    });
  }, [commands]);

  const searchedCommands = useMemo(() => {
    if (search.length > 0) {
      return sortedCommands.filter((v) => v.label.toLowerCase().includes(search.toLowerCase()));
    } else {
      return sortedCommands;
    }
  }, [sortedCommands, search]);

  const filteredCommands = useMemo(() => {

    if (filter == 'all') {
      return searchedCommands;
    } else {
      return searchedCommands.filter((v) => v.filter == filter);
    }
  }, [searchedCommands, filter]);

  const setFav = ((id: number) => {
    const newCommands = [...commands];
    const index = commands.findIndex((v) => v.id == id);
    newCommands[index].fav = !newCommands[index].fav;
    setCommands(newCommands);
    fetchNui('favCommand', id);
  });

  useNuiEvent('resetCommands', () => {
    const newCommands = [...commands];
    newCommands.forEach((v) => {
      v.fav = false;
    });
    setCommands(newCommands);
    fetchNui('resetCommands');
  });

  const context = {
    list: 'commands',
    filter: filter,
    filters: [
      { label: 'All', value: 'all' },
      { label: 'Player', value: 'player' },
      { label: 'Vehicle', value: 'vehicle' },
      { label: 'Utility', value: 'utility' },
      { label: 'Server', value: 'server' },
    ],
    setFilter: setFilter,
    search: search,
    setSearch: setSearch,
  };

  return (
    <DataList context={context}>
      {filteredCommands.map((v) => (
        <React.Fragment key={v.command + v.id}>
          {v.type == 'button' && (
            <ButtonCommand
              id={v.id}
              label={v.label}
              command={v.command}
              type={v.type}
              filter={v.filter}
              fav={v.fav}
              setFav={() => setFav(v.id)}
              active={v.active}
              close={v.close}
            />
          )}

          {v.type == 'form' && (
            <FormCommand
              id={v.id}
              label={v.label}
              command={v.command}
              type={v.type}
              filter={v.filter}
              fav={v.fav}
              setFav={() => setFav(v.id)}
              args={v.args}
              buttons={v.buttons}
              close={v.close}
            />
          )}
        </React.Fragment>
      ))}
    </DataList>
  );
};
