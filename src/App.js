import { UserProvider } from "./Context/userContext";
import Routes from "./Routes/Routes";
import './Styles/main.scss';

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>

  );
}

export default App;
