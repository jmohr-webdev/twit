import Navbar from './components/layout/Navbar';
import LoginForm from './components/auth/LoginForm';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="overlay">
        <Navbar />
        <LoginForm />
      </div>
    </div>
  );
}

export default App;
