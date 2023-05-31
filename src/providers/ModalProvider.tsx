import { createContext, ReactNode, useCallback, useState, useContext, useRef } from "react";

interface State {
    isOpen: boolean;
    openModal:(func:()=>void)=> void;
    closeModal:()=> void;
    deleteComment:()=> void;
}

const initialState: State = {
    isOpen: false,
    openModal: (func:()=>void) => {},
    closeModal:()=> {},
    deleteComment:()=> {},
}

let ModalContext = createContext<State>(initialState)


export default function ModalProvider({
    children,
}:{
    children:ReactNode,
}) {
    let [isOpen, setIsOpen] = useState(initialState.isOpen)
    let deleteComment = useRef<State['deleteComment']>(initialState.deleteComment)
    let openModal = useCallback((deletefunc:()=>void) => {
        deleteComment.current = deletefunc
        setIsOpen(true)
    },[]) 
    let closeModal = () => {
        setIsOpen(false)
    }
  return (
    <ModalContext.Provider value={{isOpen,openModal,closeModal,deleteComment:deleteComment.current}} >
        {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
