import { useState } from "react";
import Chart from "./components/Chart";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {

  const [transactions, setTransactions] = useState([]);

  return (
    <div>

      <Chart transactions={transactions} />

      <TransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
        />

      <TransactionList transactions={transactions} />


      

    

    </div>
  );
}

export default App;