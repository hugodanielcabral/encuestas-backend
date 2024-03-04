import app from "./app.js";
import { connectDB } from "./db.js";

const port = process.env.PORT || 8000

connectDB();
app.listen(port, () => {
  console.log(`Estamos escuchando el puerto ${port}`);
})