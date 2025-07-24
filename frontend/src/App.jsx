import { BrowserRouter,Routes,Route } from "react-router-dom"
import Body from "./body"
import Login from "./login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./feed"
import Profile from "./Profile"
function App() {
  

  return (
   
   <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />}/>
        </Route>
      </Routes>
    </BrowserRouter>
   </Provider>
    
   
    
  )
}

export default App
