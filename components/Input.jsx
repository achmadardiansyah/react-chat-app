import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { useRouter } from "next/router";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";


const Input = ({ chatData }) => {

    const [ input, setInput ] = useState('')
    const [user] = useAuthState(auth);
    const [ message, setMessage] = useState([]);
    const [ usersDataDocs, setUsersDataDocs ] = useState([])
    const router = useRouter();
    const messagesRef = collection(db, 'rooms', chatData.roomId, 'messages');
    const usersData = collection(db, 'rooms', chatData.roomId, 'users');

    useEffect(()=>(
        onSnapshot(query(messagesRef, orderBy('timestamp', 'asc')), (messages)=> setMessage(messages.docs))
    ), [db]);

    useEffect(()=>(
        onSnapshot(usersData, (userData)=>setUsersDataDocs(userData.docs))
    ), [db])

    const sendMessage = async (e) => {
        e.preventDefault()

        const messagesRef = collection(db, 'rooms', chatData.roomId, 'messages')

        await addDoc(messagesRef, {
            text: input,
            userId: user.uid,
            timestamp: serverTimestamp(),
            username: user.displayName,
            userImg: user.photoURL
        })

        setInput('')
    };

    return ( 
        <div className="flex flex-col md:flex-row md:h-[80vh] h-[90vh] md:w-[40vw] w-[60vw]">
            <div className="md:h-[80vh] h-[100%] w-[100%] border-r  bg-blue-300">
                <div className="md:h-[10vh] h-[10vh] px-3 flex justify-between items-center bg-blue-700">
                    <div className="text-white">
                        <h1 className="font-bold text-xl text-center">{chatData.roomName}</h1>
                        <small>Room members: {usersDataDocs.length}</small>
                    </div>
                    <button onClick={()=>router.push('/')} className="text-white py-2 px-5 bg-blue-500 hover:bg-opacity-80 rounded-md">Back to Home</button>
                </div>
                <ScrollToBottom className="md:h-[60vh] md:w-[40vw] h-[70vh] w-[100%] flex flex-col overflow-y-auto py-3">
                    {message.map(m => (
                        <Message key={m.id} message={m.data()} />
                    ))}                       
                </ScrollToBottom>
                <form className="w-[100%] md:h-[10vh] h-[10vh] flex">
                    <input 
                        type="text" 
                        value={input}
                        placeholder="Type a message..."
                        onChange={(e)=>setInput(e.target.value)}
                        className="outline-none bg-gray-200 p-3 rounded-lg flex-1"
                        />
                    <button 
                        onClick={sendMessage}
                        type='submit'
                        disabled={!input}
                        className="text-white p-3 bg-blue-700 hover:bg-blue-500 rounded-md disabled:bg-blue-500">Send</button>
                </form>
            </div>
            
        </div>
     );
}
 
export default Input;