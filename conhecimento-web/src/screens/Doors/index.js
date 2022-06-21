import { useEffect, useState, useId } from "react";
import { collection, getDocs, onSnapshot, getFirestore, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
    const db = getFirestore();
    const id = useId();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function getAllRooms() {
            const path = collection(db, "questions");
            const docs = await getDocs(path);

            const docRooms = [];
            docs.forEach((doc) => {
                docRooms.push({
                    id: `${id} - ${doc.id}`,
                    name: doc.id,
                })
            });

            setRooms(docRooms);
        }

        getAllRooms();
    }, []);

    useEffect(() => {
        async function listenCurrentDoor() {
            const ref = doc(db, "session", "currentDoor");
            onSnapshot(ref, (doc) => {
                const data = doc.data();
                if (data?.name != null) {
                    navigate("/questions");
                }
            });
        }

        listenCurrentDoor();
    }, []);

    return (
        <div>
            <h1 style={{ color: "#fff" }}>
                Doors Screen
            </h1>

            <ul style={{ display: 'flex', listStyleType: 'none', flexWrap: 'wrap', flexDirection: 'row' }}>
                {rooms.map((room, index) => (
                    <li key={index} style={{ borderRadius: 4, padding: 18, backgroundColor: "#101010", display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                        <img src={room.avatar} style={{ borderRadius: '50%' }} />
                        <p style={{ color: "#fff" }}>
                            {room.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Rooms;