import AdminMenu from "./AdminMenu/AdminMenu";
import { fetchNui } from "./utils/fetchNui";

function App() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fetchNui('closeMenu');
  });

  return (
    <>
      <AdminMenu />
    </>
  )
}

export default App
