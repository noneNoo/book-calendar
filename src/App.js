import { HashRouter, Route } from 'react-router-dom';

// Routes
import Calendar from './Routes/Calendar';
import NewBookAdd from './Routes/NewBookAdd';
import NewBookSearch from './Routes/NewBookSearch';

// Style
import './style.css';

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Calendar} />
      <Route path="/newnote/:dateId" component={NewBookAdd} />
      <Route path="/booksearch" component={NewBookSearch} />
    </HashRouter>
  );
}

export default App;
