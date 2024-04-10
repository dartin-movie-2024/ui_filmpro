import Department from "../components/Producer/Departments";
import Designations from "../components/Producer/Designations";
import AddProduction from "../components/Producer/Add Production";
import AddCrew from "../components/Producer/AddCrew";
import Producer from "../components/Producer";
import ExistingProds from "../components/Producer/Existing Productions";
import Prod_crew from "../components/Prod_crew";
import { Route } from "react-router-dom";
export const ProducerRoutes = () => (
<>
<Route path="/Producer" element={<Producer/>}>
    <Route path="/Producer/AddProduction" element={<AddProduction/>}/>
    <Route path="/Producer/ExistingProds" element={<ExistingProds/>}/>
</Route>
<Route path="/Prod_crew" element={<Prod_crew/>}>
                <Route path="/Prod_crew/Departments" element={<Department/>}/>
                <Route path="/Prod_crew/Designations" element={<Designations/>}/>
                <Route path="/Prod_crew/AddCrew" element={<AddCrew/>}/>
</Route>
</>
               
)