import { BrowserRouter,Routes,Route } from "react-router-dom"
import Body from "./body"
import Login from "./login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./feed"
import Profile from "./Profile"
import Connections from "./Connections"
import Requests from "./Requests"
import Signup from "./Signup"
import Chat from "./Chat"
function App() {
  

  return (
   
   <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/connections" element={<Connections />}/>
          <Route path="/requests" element={<Requests />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/chat/:id/:name" element={<Chat />}/>
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
    
   
    
  )
}

export default App
