import './App.css';
import SignUp from './components/Authentication/SignUp';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="">
      <SignUp/>

      <ToastContainer />
    </div>
  );
}

export default App;
