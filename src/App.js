import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Director from "./components/Director";
import Producer from "./components/Producer";
import ResponseContext from "./components/ResponseContext";
// import AssistantDirector from "./components/AssistantDirectorbefore";
import ListData from "./components/director/ListData";
import { directorRoutes } from "./routes/director.routes";
import { ProducerRoutes } from "./routes/Producer.routes";
import { AssistantdirectorRoutes } from "./routes/Assistantdirector.routes";
import AssistantDirector from "./components/AssistantDirector";
import ListDataAD from "./components/assistantdirector/ListDataAD";
import UploadScript from "./components/assistantdirector/UploadScript"
//import { AssistantdirectorRoutes } from "./routes/Assistantdirector.routes";
//import AssistantDirector from "./components/AssistantDirector";
//import ListDataAD from "./components/assistantdirector/ListDataAD";
function App() {
  const [sceneshootData, setsceneshootData] = useState({});
  return (
    <ResponseContext.Provider
      value={{
        responseData: sceneshootData,
        setResponseData: (obj) => {
          setsceneshootData(obj);
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/dashboard/Producer" element={<Producer/>}>
          </Route>
            <Route path="/dashboard/director" element={<Director />}>
              <Route
                path="/dashboard/director/verifyCrew"
                element={<ListData />}
              />
            </Route>


            <Route path="/dashboard/ad" element={<AssistantDirector />} />


            <Route path="/dashboard/ad" element={<AssistantDirector />} />
            {/* <Route path="/dashboard/ad" element={<AssistantDirector />} /> */}
            <Route path="/dashboard/assistantdirector" element={<AssistantDirector />}>
              <Route
                path="/dashboard/assistantdirector/verifyCrew"
                element={<ListDataAD />}
              />

              <Route
                path="/dashboard/assistantdirector/UploadScript"
                element={<UploadScript />}
              />
            </Route>
              
          {ProducerRoutes()}
          {AssistantdirectorRoutes()}
          {directorRoutes()}
        </Routes>
      </Router>
    </ResponseContext.Provider>
  );
}

export default App;
