// import { Routes, Route } from 'react-router-dom';
// import './css/app.css';
import './App.css';
// PAGES
import Home from './pages/Home';
// import Lost from './pages/Lost';
// COMPONENTS
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      {/* <Routes> */}
          {/* <Route path="/location/:locationId" element={<Location />} /> */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="*" element={<Lost />} /> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
