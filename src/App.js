import './App.css';
import Navbar from './components/Navbar/Navbar';
import Subjects from './components/Subjects/Subjects';
import { Route, Routes, Navigate } from 'react-router-dom';
import Lectures from './components/Lectures/Lectures';
import Students from './components/Students/Students';
import Coordinator from './components/Coordinator/Coordinator';
import Login from './components/Login/Login';
function App() {
  const isAuth = localStorage.getItem("USER_TOKEN")
  return (
    <div className="App">
      {isAuth ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to='/subjects' /> : <Login />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/lectures/:subjectId" element={<Lectures />} />
        <Route path="/students" element={<Students />} />
        <Route path="/coordinator" element={<Coordinator />} />
      </Routes>
    </div>
  );
}
export default App;
