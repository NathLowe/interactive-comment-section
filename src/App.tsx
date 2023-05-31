import { useState } from "react"
import AddComment from "./components/AddComment"
import Comment from "./components/Comment"
import Nested from "./components/Nested"
import Modal from "./components/Modal"


function App() {

  return (
    <>
      <div className="max-w-screen-md mx-auto p-6">
        <Comment tagged="maximus"/>
        <Comment/>
        <Comment/>
        <Nested>
          <Comment isUserComment={true} />
        </Nested>
        <AddComment isMain={true} />
        
      </div>
      <Modal/>
    </>
  )
}

export default App
