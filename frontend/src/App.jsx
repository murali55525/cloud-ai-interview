import './index.css'
import FrontPage from './FrontPage'
import AdminHome from '../admin/AdminHome'
import ClientHome from '../client/ClientHome'
import { useState } from 'react'

function App() {
  const [screen, setScreen] = useState(null);
  const [clientName, setClientName] = useState('');
  const [task, setTask] = useState('');
  const [assigned, setAssigned] = useState(false);

  if (screen === 'admin') {
    return (
      <AdminHome
        onBack={() => setScreen(null)}
        clientName={clientName}
        setClientName={setClientName}
        task={task}
        setTask={setTask}
        assigned={assigned}
        setAssigned={setAssigned}
      />
    );
  }
  if (screen === 'client') {
    return (
      <ClientHome
        onBack={() => setScreen(null)}
        task={task}
      />
    );
  }

  return (
    <FrontPage onSelect={setScreen} />
  );
}

export default App
