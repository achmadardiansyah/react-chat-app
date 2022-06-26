import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const RoomList = () => {

    const [rooms, setRooms] = useState([])
    const [user] =  useAuthState(auth)
    const router = useRouter()

    useEffect(()=>(

        onSnapshot(collection(db, 'rooms'), (rooms)=>setRooms(rooms.docs))

    ), [db])

    const enterRoom = async (room) => {

        const usersRef = doc(db, 'rooms', room, 'users', user.email)

        await setDoc(usersRef, {
            userId: user.uid
        });

        router.push(`/chat-room/${room}`)
    };

    const deleteRoom = async (room) => {

        const usersRef = doc(db, 'rooms', room)

        await deleteDoc(usersRef)

        alert('Room has been deleted')
    }

    return ( 
        <div>
            {rooms.map(room => (
                <div key={room.data().roomId} className='flex md:flex-row md:space-y-0 space-y-3 flex-col items-center my-2 justify-between w-2/3 p-1 mx-auto border-b border-gray-300'>
                    <span>{room.data().roomName}</span>
                    <span>ID: {room.data().roomId}</span>
                    <button onClick={()=>enterRoom(room.data().roomId)} className="text-white py-2 px-5 bg-blue-700 hover:bg-opacity-80 rounded-md">Enter room</button>
                    {user.uid == room.data().adminId && <button onClick={()=>deleteRoom(room.data().roomId)} className="text-white py-2 px-5 bg-red-700 hover:bg-opacity-80 rounded-md">Delete room</button>}
                </div>
            ))}
        </div>
     );
}
 
export default RoomList;