import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Doors from "../fragments/Doors";
import Questions from "../fragments/Questions";

const Tab = createNativeStackNavigator();

const Fragments = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Doors"
        >
            <Tab.Screen name="Doors" component={Doors} />
            <Tab.Screen name="Questions" component={Questions} />
        </Tab.Navigator>
    )
}

export default Fragments;