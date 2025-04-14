import './App.css';
import io from 'socket.io-client'; // Only this import for the frontend
import { useState } from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");
//const socket = io.connect("https://livechathub-4.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Nidhesh A Chat</h3>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="room"
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
