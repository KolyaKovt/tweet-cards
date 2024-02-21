import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Home/Home"
import Tweets from "./Tweets/Tweets"

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="tweets" element={<Tweets />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  )
}

export default App
