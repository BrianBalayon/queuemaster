import { getAllGroups } from "./logic/queue";

function App() {
  
  const groups = getAllGroups();
  console.log(groups);

  return (
    <div className="App">
    </div>
  );
}

export default App;
