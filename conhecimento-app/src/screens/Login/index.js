import { useEffect, useState } from 'react';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
    const db = getFirestore();
    const [name, setName] = useState("");

    useEffect(() => {
        async function getUserData(){
            const hasLogin = await AsyncStorage.getItem('@conhecimento_poder_Login');
            if(hasLogin != null){
                // AsyncStorage.removeItem('@conhecimento_poder_Login')
                navigateToMenu();
            }
        }

        getUserData();
    }, [])

    const navigateToMenu = () => {
        navigation.navigate("Menu");
    }

    async function upsertUser() {
        const path = collection(db, "players");
        const user = {
            name: name,
            avatar: `https://ui-avatars.com/api/?name=${name}`,
        };

        const newDoc = await addDoc(path, {
            ...user
        });

        const userString = JSON.stringify({...user, id: newDoc.id});
        await AsyncStorage.setItem('@conhecimento_poder_Login', userString);

        navigateToMenu();
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#070807", justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 26, color: "#fff", marginBottom: 20 }}>
                Digite o seu nome
            </Text>
            <TextInput
                keyboardAppearance='dark'
                placeholderTextColor={"#999"}
                style={{ backgroundColor: "#101010", color: "#fff", fontSize: 18, padding: 10, borderRadius: 4, minWidth: 350 }}
                placeholder='Digite o seu nome' value={name} onChangeText={setName} />

            <TouchableOpacity
                style={{ backgroundColor: "#2ed573", padding: 10, marginTop: 15, borderRadius: 4, minWidth: 200, justifyContent: 'center', alignItems: 'center' }}
                onPress={() => upsertUser()}
            >
                <Text style={{ color: "#000" }}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;
