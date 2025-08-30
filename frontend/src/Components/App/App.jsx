import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Chat from "../../pages/Chat/Chat";

const App = () => {
    return (
        
        <BrowserRouter >
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/Chat" element={<Chat/>}></Route>
        </Routes>
        </BrowserRouter>
      );
}
 
export default App;