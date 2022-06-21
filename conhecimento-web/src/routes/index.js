import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "../screens/Home";
import Doors from "../screens/Doors"
import Questions from "../screens/Questions"

const StackRoutes = () => {
    return ( 
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/doors" element={<Doors />} />
                <Route path="/questions" element={<Questions />} />
            </Routes>
        </BrowserRouter>
    )
}

export default StackRoutes;