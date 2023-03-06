import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddVacation from './components/AddVacation/AddVacationModal';
import Layout from './components/Layout/Layout';
import LoginModal from './components/LoginModal/LoginModal';
import Logout from './components/Logout/Logout';
import RegisterModal from './components/RegisterModal/RegisterModal';
import SpinnerForVacations from './components/Vacations/SpinnerForVacations';
import VacationsStatistics from './components/VacationsStatistics/VacationsStatistics';
import SocketContainer from './Context/socket-container';



function App() {            //register with "admin" User Name for site administrator creation
  return (
    <div className="App">
      <SocketContainer>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/RegisterModal" element={<RegisterModal />} />
        <Route path="/LoginModal" element={<LoginModal />} />
        <Route path="/Spinner" element={<SpinnerForVacations />} />
        <Route path="/AddVacation" element={<AddVacation />} />
        <Route path="/VacationsStatistics" element={<VacationsStatistics />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
      </BrowserRouter>
    </SocketContainer>
    </div>
  );
}

export default App;
