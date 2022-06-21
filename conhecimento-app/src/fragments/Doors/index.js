import { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import { doc, onSnapshot, setDoc, getFirestore } from "firebase/firestore";

function Doors({ navigation }) {
    const db = getFirestore();
    const [doors, setDoors] = useState(["Esportes", "Video-games", "Coisas de casal", "Sobrenatural"]);

    useEffect(() => {
        const path = doc(db, "session", "currentDoor");
        onSnapshot(path, (doc) => {
            const data = doc.data();

            if (data.name != null) {
                navigation.navigate("Game", {
                    screen: "Questions"
                });
            }
        });
    }, []);

    const navigateToQuestions = (choosedDoor) => {
        const ref = doc(db, "session", "currentDoor");

        setDoc(ref, {
            name: choosedDoor
        });
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#070807" }}>
            <Text style={{ color: "#fff", fontSize: 36, textAlign: 'center', fontWeight: 'bold' }}>
                Escolha uma porta
            </Text>
            <FlatList
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                contentContainerStyle={{ marginTop: 48 }}
                data={doors}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            backgroundColor: "#101010",
                            marginBottom: 20,
                            width: "47%",
                            minHeight: 100,
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: 4
                        }}
                        onPress={() => navigateToQuestions(item)}
                    >
                        <Text style={{ color: "#fff" }}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Doors;