import { theme } from './theme';
import { MantineProvider } from '@mantine/core';
import { fetchNui } from './utils/fetchNui';

const App: React.FC = () => {
  fetchNui('init');

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      fetchNui('closeMenu');
    }
  });

  return (
    <MantineProvider withNormalizeCSS theme={{ ...theme }}>

    </MantineProvider>
  );
};

export default App;
