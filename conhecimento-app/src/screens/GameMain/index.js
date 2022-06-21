import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Fragments from "../../routes/fragments";

function Game() {
    return (
        <View style={{ flex: 1, padding: 36, backgroundColor: "#070807" }}>
            <StatusBar style="light" hidden />
            <Fragments />
        </View>
    )
}

export default Game;