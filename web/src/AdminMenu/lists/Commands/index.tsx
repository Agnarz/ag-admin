import React, { useState, useMemo } from 'react';
import type { CommandProps } from './types';
import { DataList } from '../../components/DataList';
import ButtonCommand from './components/ButtonCommand';
import FormCommand from './components/FormCommand';
import { useNuiEvent } from '../../../hooks/useNuiEvent';

export const CommandsList: React.FC = () => {
  const [commands, setCommands] = useState<CommandProps[]>([]);
  useNuiEvent('setCommands', setCommands);

  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const searchedCommands = useMemo(() => {
    if (search.length > 0) {
      return commands.filter((v) => v.label.toLowerCase().includes(search.toLowerCase()));
    } else {
      return commands;
    }
  }, [commands, search]);

  const filteredCommands = useMemo(() => {
    if (filter == 'all') {
      return searchedCommands;
    } else {
      return searchedCommands.filter((v) => v.filter == filter);
    }
  }, [searchedCommands, filter]);

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
  }
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
