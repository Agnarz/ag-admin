import React, { useState, useMemo } from 'react';
import type { CommandProps } from '../../../types';
import { DataList } from '../../components/DataList';
import ButtonCommand from './components/ButtonCommand';
import FormCommand from './components/FormCommand';
import { useNuiEvent } from '../../../hooks/useNuiEvent';
import { fetchNui } from '../../../utils/fetchNui';
import { useCommands, useFavorites } from '../../../state';

export const CommandsList: React.FC = () => {
  const [commands, setCommands] = useCommands();
  const [favorites, setFavorites] = useFavorites();

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

  const searchCommands = sortedCommands.filter((v) => {
    if (search.length > 0) {
      return v.label.toLowerCase().includes(search.toLowerCase());
    } else {
      return true;
    }
  });

  const filteredCommands = searchCommands.filter((v) => {
    if (filter == 'all') {
      return true;
    } else {
      return v.filter == filter;
    }
  });

  const setFav = ((command: string) => {
    const newCommands = [...commands];
    const index = commands.findIndex((v) => v.command == command);
    newCommands[index].fav = !newCommands[index].fav;
    setCommands(newCommands);

    const newFavorites = [...favorites];
    if (newFavorites.includes(command)) {
      newFavorites.splice(newFavorites.indexOf(command), 1);
    } else {
      newFavorites.push(command);
    }
    setFavorites(newFavorites);
    fetchNui('favorite', newFavorites);
  });

  useNuiEvent('resetCommands', () => {
    const newCommands = [...commands];
    newCommands.forEach((v) => {
      v.fav = false;
    });
    setCommands(newCommands);
    setFavorites([]);
    fetchNui('resetCommands');
  });

  return (
    <DataList context={{
      list: 'commands',
      filter: filter,
      filters: [
        { label: 'All', value: 'all' },
        { label: 'Player', value: 'player' },
        { label: 'Vehicle', value: 'vehicle' },
        { label: 'Utility', value: 'utility' },
        { label: 'User', value: 'user' },
        { label: 'Server', value: 'server' }
      ],
      setFilter: setFilter,
      search: search,
      setSearch: setSearch
    }}>
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
              setFav={() => setFav(v.command)}
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
              setFav={() => setFav(v.command)}
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
