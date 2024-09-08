import './App.css';
import Navbar from './components/Navbar/Navbar';
import Subjects from './components/Subjects/Subjects';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Lectures from './components/Lectures/Lectures';
import Students from './components/Students/Students';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/lectures" element={<Lectures />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
