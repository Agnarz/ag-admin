
import { fetchNui } from './utils/fetchNui';
import { AdminMenu } from './AdminMenu';
import { SetOptions } from './AdminMenu/lists/Commands/options';
import { useNuiEvent } from './hooks/useNuiEvent';

const App: React.FC = () => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fetchNui('closeMenu');
  });

  useNuiEvent('setTargets', (data) => {
    SetOptions('Targets', data);
  });

  return (
    <>
      <AdminMenu />
    </>
  );
};

export default App;
