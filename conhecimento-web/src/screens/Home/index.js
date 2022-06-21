import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, getFirestore } from "firebase/firestore";

const Home = () => {
    const db = getFirestore();

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const path = collection(db, "players");
        onSnapshot(path, (querySnapshot) => {
            const playersDoc = [];
            querySnapshot.forEach((doc) => {
                playersDoc.push(doc.data());
            });

            setPlayers(playersDoc);
        })
    }, [])

    return (
        <div style={{ backgroundColor: "#070807" }}>
            <h1 style={{ color: "#fff" }}>
                Bem vindo!
            </h1>

            <h3 style={{ color: "#fff", margin: "1em 0" }}>
                {players.length} jogadores conectados
            </h3>

            <ul style={{ display: 'flex', listStyleType: 'none', flexWrap: 'wrap', flexDirection: 'row' }}>
                {players.map((player, index) => (
                    <li key={index} style={{ borderRadius: 4, padding: 18, backgroundColor: "#101010", display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                        <img src={player.avatar} style={{ borderRadius: '50%' }} />
                        <p style={{ color: "#fff" }}>
                            {player.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home;