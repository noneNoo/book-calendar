import { HashRouter, Route } from 'react-router-dom';

// Routes
import Calendar from './Routes/Calendar';

// Style
import './style.css';

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Calendar}></Route>
    </HashRouter>
  );
}

export default App;
