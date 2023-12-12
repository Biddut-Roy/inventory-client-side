import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import useAuth from "../../Hooks/useAuth";



const socket = io.connect("https://inventory-shop-management.vercel.app");

const LiveChatRoom = () => {
    const { user } = useAuth()
    const [username] = useState(user?.displayName);
    const [room] = useState('update1234');
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-white text-gray-700 font-open-sans grid text-center pt-10">
                {!showChat ? (
                    <div className="joinChatContainer">
                        <h3 className="text-3xl mb-4">Join A Chat</h3>
                        <input className="w-52 h-10 m-2 border-2 border-green-600 rounded-md p-1 text-white"
                            type="text"
                            value={user.displayName}
                            readOnly
                        />
                        <input
                            className="w-52 h-10 m-2 border-2 border-green-600 rounded-md p-1 text-white"
                            type="text"
                            value='update1234'
                            readOnly
                        />
                        <button
                            className="w-56 h-12 m-2 border-none rounded-md p-1 text-base bg-green-600 text-white cursor-pointer hover:bg-[#2e7d32]"
                            onClick={joinRoom}>Join A Room</button>
                    </div>
                ) : (
                    <div className=" w-10/12 mx-auto">
                        <Chat socket={socket} username={username} room={room} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveChatRoom;