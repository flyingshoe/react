import React, { useState } from "react"
import FetchPosts from "./test"


function App() {
  const [showPosts, setShowPosts] = useState()

  return (
    <div>
      <button onClick={() => setShowPosts(true)}>Fetch Posts</button>
      <button onClick={() => setShowPosts(false)}>Hide Posts</button>
      {showPosts && <FetchPosts />}
    </div>
  )
}

export default App