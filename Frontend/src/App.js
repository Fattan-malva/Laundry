import './App.css';
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import Menu from './component/menu/Menu';
import Home from './component/home/Home';

import ListOwner from './component/ListOwner/Owner';
import OwnerAdd from './component/ListOwner/OwnerAdd';
import OwnerEdit from './component/ListOwner/OwnerEdit';
import OwnerDelete from './component/ListOwner/OwnerDelete';

import ListUnit from './component/ListUnit/Unit';
import UnitAdd from './component/ListUnit/UnitAdd';
import UnitEdit from './component/ListUnit/UnitEdit';
import UnitDelete from './component/ListUnit/UnitDelete';

function App() {
  return (
    <Router >
      <div className="app-header">
        <Menu/>
      </div>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route path="/listowner" element={<ListOwner/>}></Route>
          <Route path="/owner_add" element={<OwnerAdd/>} />
          <Route path="/owner_edit/:id" element={<OwnerEdit/>} />
          <Route path="/owner_delete/:id" element={<OwnerDelete/>} />

          <Route path="/listunit" element={<ListUnit/>} />
          <Route path="/unit_add" element={<UnitAdd/>} />
          <Route path="/unit_edit/:id" element={<UnitEdit/>} />
          <Route path="/unit_delete/:id" element={<UnitDelete/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;