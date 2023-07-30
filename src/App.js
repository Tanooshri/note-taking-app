import logo from './logo.svg';
import './App.css';
import { NotePage } from './modules/notes/pages/NotePage';
import { Dashboard } from './modules/dashboard/pages/Dashboard';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './shared/store/store';


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes/>
    <Dashboard/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
