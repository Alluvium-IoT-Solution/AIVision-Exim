import RouterComponent from './RouterComponent'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './Context/auth-context';


function App() {
  return (
    <AuthContextProvider>
    <div className="App">
      <BrowserRouter>
        <RouterComponent></RouterComponent>
      </BrowserRouter>
    </div>
  </AuthContextProvider>
  );
}

export default App;
