import express from "express";
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is listing on port number ${3000}`);
});
