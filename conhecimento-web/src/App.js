import { initializeApp } from 'firebase/app';
import Routes from './routes';

function App() {
  const firebaseConfig = {
    databaseURL: 'https://conhecimento-eh-poder-default-rtdb.firebaseio.com',
    projectId: 'conhecimento-eh-poder',
  };

  initializeApp(firebaseConfig);

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
