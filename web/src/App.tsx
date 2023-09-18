import { theme } from './theme';
import { MantineProvider } from '@mantine/core';
import { fetchNui } from './utils/fetchNui';
import AdminMenu from './AdminMenu';
import { SetOptions } from './AdminMenu/components/Commands/options';
import { useNuiEvent } from './hooks/useNuiEvent';
const App: React.FC = () => {
  fetchNui('init');

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fetchNui('closeMenu');
    }
  });

  useNuiEvent('setOptions', (data) => {
    SetOptions('Vehicles', data.vehicles);
    SetOptions('Weapons', data.weapons);
    SetOptions('PedModels', data.pedmodels);
    SetOptions('Teleports', data.teleports);
    SetOptions('Timecycles', data.timecycles);
    SetOptions('Weather', data.weather);
  });

  useNuiEvent('setTargets', (data) => {
    SetOptions('Targets', data);
  });

  useNuiEvent('setPlayers', (data) => {
    SetOptions('Players', data);
  });

  return (
    <MantineProvider withNormalizeCSS theme={{ ...theme }}>
      <AdminMenu />
    </MantineProvider>
  );
};

export default App;
