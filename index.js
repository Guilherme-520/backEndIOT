// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc } = require("firebase/firestore");


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBeo7IrZt5QNF4iydR4iIefIbE4Q5Z5_2o",
  
    authDomain: "projectiot-40548.firebaseapp.com",
  
    projectId: "projectiot-40548",
  
    storageBucket: "projectiot-40548.appspot.com",
  
    messagingSenderId: "773740698896",
  
    appId: "1:773740698896:web:7df0d3451fd1225a69d995"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Express
const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

server.post("/", async function(req, res) {
    const data = req.body;
    try {
        const docRef = await addDoc(collection(db, "lixo"), data);
        res.json("Cadastrado com sucesso: " + docRef.id);
    } catch (e) {
        console.error("Erro ao adicionar o documento: ", e);
        res.status(500).json("Erro ao cadastrar");
    }
});

server.get("/", async function(req, res) {
    try {
        const querySnapshot = await getDocs(collection(db, "lixo"));
        const documents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(documents);
    } catch (e) {
        console.error("Erro ao buscar documentos: ", e);
        res.status(500).json("Erro ao buscar registros");
    }
});

server.listen(8081, () => {
    console.log("API rodando na porta 8081");
});
