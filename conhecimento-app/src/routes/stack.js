import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Menu from "../screens/Menu";
import Game from "../screens/GameMain";
import Questions from "../fragments/Questions";

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Game" component={Game} />
            <Stack.Screen name="Questions" component={Questions} />
        </Stack.Navigator>
    )
}

export default StackRoutes;