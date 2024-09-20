import './App.css';
import Navbar from './components/Navbar/Navbar';
import Subjects from './components/Subjects/Subjects';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Lectures from './components/Lectures/Lectures';
import Students from './components/Students/Students';
import Coordinator from './components/Coordinator/Coordinator';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Subjects />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/students" element={<Students />} />
        <Route path="/coordinator" element={<Coordinator />} />
      </Routes>
    </div>
  );
}
export default App;
