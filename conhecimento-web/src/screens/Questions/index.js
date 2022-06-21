import { useState, useEffect } from "react";
import { deleteDoc, getFirestore, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Questions = () => {
    const db = getFirestore();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState("");
    const [choosedDoor, setChoosedDoor] = useState("");
    const [seconds, setSeconds] = useState(15);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const path = doc(db, "session", "currentDoor");
        onSnapshot(path, (doc) => {
            const data = doc.data();

            if (data.name != null) {
                setChoosedDoor(data.name);
            }
        });

        return () => {
            setChoosedDoor("");
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

            const checkExistentDoor = await getExistentCurrentQuestion();
            console.log('checkExistentDoor', checkExistentDoor);
            if (checkExistentDoor === false) {
                const titleKeyQuestionsList = Object.keys(data);

                const randomTitleQuestionKey = titleKeyQuestionsList[Math.floor(Math.random() * titleKeyQuestionsList.length)];
                setTitle(randomTitleQuestionKey);

                const listQuestionsAlternatives = Object.values(data[randomTitleQuestionKey]);
                setQuestions(listQuestionsAlternatives);

                saveChoosedQuestion(randomTitleQuestionKey);
            } else {
                if (title !== "") {
                    const listQuestionsAlternatives = Object.values(data[title]);
                    setQuestions(listQuestionsAlternatives);
                }
            }
        }

        async function getExistentCurrentQuestion() {
            let exists = false;

            const path = doc(db, "session", "currentQuestion");
            const docSnap = await getDoc(path);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.name);
                exists = true;
            } else {
                exists = false;
            }

            return exists;
        }

        if (choosedDoor !== "") {
            getQuestions();
        }
    }, [title, choosedDoor]);

    useEffect(() => {
        let interval;

        if (isFinished === false) {
            interval = setInterval(() => {
                if (seconds >= 1) {
                    setSeconds((prevState) => prevState - 1);
                } else {
                    setIsFinished(true);
                    saveFinishedQuestion();
                }
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        }
    }, [isFinished, seconds]);

    useEffect(() => {
        async function listenContinueClickAction() {
            const ref = doc(db, "session", "continueClick");
            onSnapshot(ref, (doc) => {
                const data = doc.data();
                if (data?.action === true) {
                    deleteDoc(ref);
                    navigate("/doors");
                }
            });
        }

        listenContinueClickAction();
    }, []);

    function saveFinishedQuestion() {
        const ref = doc(db, "session", "currentQuestion");

        setDoc(ref, {
            isFinished: true
        }, { merge: true });
    }

    const saveChoosedQuestion = (title) => {
        const ref = doc(db, "session", "currentQuestion");

        setDoc(ref, {
            name: title,
            isFinished: false
        });
    }

    return (
        <div style={{ color: "#fff" }}>
            {seconds <= 0 ? (
                <div>
                    <h1>
                        Clique em continuar no seu celular
                    </h1>
                </div>
            ) : (
                <div>
                    <h3>{choosedDoor}</h3>
                    <p>{seconds}</p>
                    <h1>{title}</h1>
                </div>
            )}
        </div>
    )
}

export default Questions;