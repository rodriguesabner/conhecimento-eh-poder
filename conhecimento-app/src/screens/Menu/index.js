import { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { setDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";

function Menu({ navigation }) {
    const db = getFirestore();

    useEffect(() => {
        const path = doc(db, "session", "game");
        onSnapshot(path, (doc) => {
            const data = doc.data();
            if (data.isRunning === true) {
                navigation.navigate("Game");
            }
        });
    }, []);

    const navigateToGame = () => {
        startSession();
    }

    const startSession = () => {
        const ref = doc(db, "session", "game")
        setDoc(ref, {
            isRunning: true
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#070807", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Text style={{ fontSize: 26, color: "#fff", marginBottom: 20, maxWidth: 400, textAlign: 'center' }}>
                Toque e segure no botão abaixo para iniciar o jogo
            </Text>

            <TouchableOpacity
                style={{ backgroundColor: "#2ed573", padding: 16, marginTop: 15, borderRadius: 4 }}
                onLongPress={() => navigateToGame()}
            >
                <Text style={{ color: "#000", fontSize: 18 }}>
                    Iniciar
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu;