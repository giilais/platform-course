const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const crypto = require("crypto");
const multer = require("multer");

app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "platform-course",
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do JWT
const segredoJWT = crypto.randomBytes(64).toString("hex");

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Cadastrar um usuário
app.post("/register", (req, res) => {
  const { nome, email, senha, isAdm } = req.body;
  const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

  connection.query(query, [nome, email, senha], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar usuário:", err);
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
      return;
    }

    const token = jwt.sign({ email }, segredoJWT, { expiresIn: "1h" });
    res.json({ token });
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const query = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

  connection.query(query, [email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao realizar login:", err);
      res.status(500).json({ error: "Erro ao realizar login" });
      return;
    }

    if (results.length > 0) {
      const token = jwt.sign({ email, userId: results[0].id }, segredoJWT, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  });
});

// Metodo para LISTAR/GET dos cursos
app.get("/cursos", (req, res) => {
  const query = "SELECT * FROM `platform-course`.curso";
  connection.query(query, (error, results) => {
    if (error) throw error;

    // Itera pelos resultados e converte as imagens para Base64
    results.forEach((curso) => {
      curso.imagem = curso.imagem.toString("base64");
    });

    res.json(results);
  });
});

// Metodo para LISTAR/GET dos DETALHES do curso
app.get("/cursos/:id", (req, res) => {
  const cursoId = req.params.id;
  const query = `SELECT * FROM \`platform-course\`.curso WHERE id = ${cursoId}`;

  connection.query(query, (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      // Converte a imagem para Base64
      results[0].imagem = results[0].imagem.toString("base64");

      res.json(results[0]);
    } else {
      res.status(404).json({ message: `Curso com ID ${cursoId} não encontrado` });
    }
  });
});

// Rota para ADICIONAR um novo curso
app.post("/cursos/adicionar", upload.single("file"), (req, res) => {
  const { titulo, descricao, descricaoCompleta, topicos } = req.body;
  const imagem = req.file.path;

  const query =
    "INSERT INTO curso (titulo, imagem, descricao, descricaoCompleta, topicos) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    query,
    [titulo, imagem, descricao, descricaoCompleta, topicos],
    (err, result) => {
      if (err) {
        console.error("Erro ao adicionar curso: " + err.message);
        res.status(500).send("Erro ao adicionar curso");
      } else {
        res.status(200).send("Curso adicionado com sucesso");
      }
    }
  );
});

// Metodo para EDITAR um curso
app.put("/cursos/editar/:id", (req, res) => {
  const cursoId = req.params.id;
  const { titulo, imagem, descricao, descricaoCompleta, topicos } = req.body;

  const query =
    "UPDATE curso SET titulo=?, imagem=?, descricao=?, descricaoCompleta=?, topicos=? WHERE id=?";
  connection.query(
    query,
    [titulo, imagem, descricao, descricaoCompleta, topicos, cursoId],
    (err, result) => {
      if (err) {
        console.error("Erro ao editar curso: " + err.message);
        res.status(500).send("Erro ao editar curso");
      } else {
        res.status(200).send("Curso editado com sucesso");
      }
    }
  );
});

//Metodo para EXCLUIR um curso
app.delete("/cursos/excluir/:id", (req, res) => {
  const cursoId = req.params.id;

  const query = "DELETE FROM curso WHERE id=?";
  connection.query(query, [cursoId], (err, result) => {
    if (err) {
      console.error("Erro ao excluir curso: " + err.message);
      res.status(500).send("Erro ao excluir curso");
    } else {
      res.status(200).send("Curso excluído com sucesso");
    }
  });
});

// registrar um usuário em um curso
app.post("/registerInCourse", (req, res) => {
  const { usuario_id, curso_id } = req.body;

  const query = `INSERT INTO usuarios_cursos (usuario_id, curso_id) VALUES (?, ?)`;
  connection.query(query, [usuario_id, curso_id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res
        .status(200)
        .json({ message: "Usuário registrado no curso com sucesso" });
    }
  });
});

// Metodo para obter o número de usuários inscritos em um curso específico
app.get("/cursos/count/:usuarioId", (req, res) => {
  const usuarioId = req.params.usuarioId;

  const query =
    "SELECT COUNT(*) as total FROM usuarios_cursos WHERE usuario_id = ?";
  connection.query(query, [usuarioId], (error, results) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(results[0].total);
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
