import React, { useState } from 'react';
import type { CommandProps } from './types';
import DataList from '../../components/DataList';
import ButtonCommand from './components/ButtonCommand';
import FormCommand from './components/FormCommand';
import { useNuiEvent } from '../../../hooks/useNuiEvent';

const CommandsList: React.FC = () => {
  const [commands, setCommands] = useState<CommandProps[]>([]);
  useNuiEvent('setCommands', setCommands);

  return (
    <DataList>
      {commands.map((v, index) => (
        <React.Fragment key={index}>
          {v.type == 'button' && (
            <ButtonCommand
              id={index}
              label={v.label}
              command={v.command}
              type={v.type}
              active={v.active}
              close={v.close}
            />
          )}

          {v.type == 'form' && (
            <FormCommand
              id={index}
              label={v.label}
              command={v.command}
              type={v.type}
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

export default CommandsList;
