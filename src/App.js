import './App.css';
import { BillingContextProvider } from './BillingContextProvider/BillingContextProvider';
import BillTable from './components/BillingPage/BillTable';
import Modal from './components/BillingPage/Modal';

function App() {
  return (
    <div className="">
     <BillingContextProvider>
      <BillTable/>
      <Modal/>
     </BillingContextProvider>
    </div>
  );
}

export default App;
