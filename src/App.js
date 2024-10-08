import './App.css';
import Navbar from './components/Navbar/Navbar';
import Subjects from './components/Subjects/Subjects';
import { Route, Routes, Navigate } from 'react-router-dom';
import Lectures from './components/Lectures/Lectures';
import Students from './components/Students/Students';
import Coordinator from './components/Coordinator/Coordinator';
import Login from './components/Login/Login';
import Statistics from './components/Statistics/Statistics';
function App() {
  const isAuth = localStorage.getItem("USER_TOKEN")
  return (
    <div className="App">
      {isAuth ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to='/subjects' /> : <Login />} />
        <Route path="/subjects" element={isAuth ? <Subjects /> : <Navigate to='/' />} />
        <Route path="/lectures/:subjectId" element={isAuth ? <Lectures /> : <Navigate to='/' />} />
        <Route path="/students" element={isAuth ? <Students /> : <Navigate to='/' />} />
        <Route path="/coordinator" element={isAuth ? <Coordinator /> : <Navigate to='/' />} />
        <Route path="/statistics/:studentId" element={isAuth ? <Statistics /> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
}
export default App;
