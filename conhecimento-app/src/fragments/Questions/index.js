import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import firestore, { getFirestore, doc, getDoc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from "react";

function Questions({ navigation }) {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState("");
    const [choosedDoor, setChoosedDoor] = useState("");
    const [choosedAnswer, setChoosedAnswer] = useState(null);
    const [isFinished, setIsFinished] = useState(false);

    const db = getFirestore();

    //TODO: pontuação
    //primeiro lugar: 400
    //segundo lugar: 300
    //terceiro lugar: 200
    //quarto lugar: 100

    //isso se a pessoa acertou alguma alternativa, 
    //caso contrario, não ganha pontos!

    useEffect(() => {
        async function getCurrentDoor() {
            const path = doc(db, "session", "currentDoor");
            const docSnap = await getDoc(path);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setChoosedDoor(data.name);
                getCurrentQuestionTitle();
            }
        }

        async function getCurrentQuestionTitle() {
            const path = doc(db, "session", "currentQuestion");
            onSnapshot(path, (doc) => {
                const data = doc.data();
                if (data?.name != null) {
                    setTitle(data.name);
                }
            });
        }

        getCurrentDoor();

        return () => {
            setChoosedDoor("");
            setTitle("");
        }
    }, []);

    useEffect(() => {
        async function getQuestions() {
            let customDoor = choosedDoor;
            if (customDoor === "Esportes") {
                customDoor = "sports";
            }

            const ref = await getDoc(doc(db, "questions", customDoor));
            const data = ref.data();

            if (title !== "") {
                const listQuestionsAlternatives = Object.values(data[title]);
                setQuestions(listQuestionsAlternatives);
            }
        }

        if (choosedDoor !== "") {
            getQuestions();
        }
    }, [title, choosedDoor]);

    useEffect(() => {
        async function listenIsFinished() {
            const ref = doc(db, "session", "currentQuestion");
            onSnapshot(ref, (doc) => {
                const data = doc.data();
                if (data?.isFinished === true) {
                    setIsFinished(true);
                }
            });
        }

        listenIsFinished();
    }, [isFinished]);

    useEffect(() => {
        async function listenContinueClickAction() {
            const ref = doc(db, "session", "continueClick");
            onSnapshot(ref, (doc) => {
                const data = doc.data();
                if (data?.action === true) {
                    navigation.navigate("Game", {
                        screen: "Doors"
                    })
                }
            });
        }

        listenContinueClickAction();
    }, []);

    const handleClickQuestion = (item) => {
        setChoosedAnswer({
            answer: item.isCorrect,
            answerAt: new Date().getTime()
        });
    }

    async function navigateToDoorsScreen() {
        const pathDoor = doc(db, "session", "currentDoor");
        await setDoc(pathDoor, {
            name: null
        });

        const pathQuestion = doc(db, "session", "currentQuestion");
        await deleteDoc(pathQuestion);

        const pathGameQuestion = doc(db, "session", "continueClick");
        await setDoc(pathGameQuestion, {
            action: true,
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#070807", paddingTop: 26 }}>
            {isFinished === false ? (
                choosedAnswer != null ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: "#fff", fontSize: 20, maxWidth: 300, textAlign: 'center' }}>
                            Aguarde o tempo acabar, você já deu sua resposta
                        </Text>
                    </View>
                ) : (
                    <View>
                        {/* <View style={{ width: '100%', marginTop: 36 }}>
                            <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>
                                {seconds}
                            </Text>
                        </View> */}

                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 36, color: "#fff", textAlign: 'center' }}>
                            {title}
                        </Text>

                        <FlatList
                            contentContainerStyle={{ marginTop: 20 }}
                            data={questions}
                            numColumns={2}
                            columnWrapperStyle={{
                                justifyContent: 'space-between',
                                marginBottom: 16
                            }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={{
                                        width: '47%',
                                        backgroundColor: "#101010",
                                        paddingVertical: 20,
                                        borderRadius: 4,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={() => handleClickQuestion(item)}
                                >
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        color: "#fff",
                                        textAlign: 'center',
                                        maxWidth: 200
                                    }}>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            backgroundColor: "#2ed573",
                            marginTop: 36,
                            borderRadius: 4
                        }}
                        onPress={() => navigateToDoorsScreen()}
                    >
                        <Text style={{ color: "#000", fontSize: 24 }}>
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

export default Questions;