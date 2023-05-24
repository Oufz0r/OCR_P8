import { Routes, Route } from 'react-router-dom';
import './css/app.css';
// PAGES
import Home from './pages/Home';
import Lost from './pages/Lost';
// COMPONENTS
// import Header from './components/header';

function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      {/* <Home /> */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Lost />} />
      </Routes>
    </div>
  );
}

export default App;
