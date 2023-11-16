import SideBar from "./components/Common/SideBar";
import Header from "./components/Common/Header";
import AllRouting from "./components/Routing";
function App() {
  return (
    <div className="page">
      <Header />
      <SideBar />
      <AllRouting />
    </div>
  );
}

export default App;
