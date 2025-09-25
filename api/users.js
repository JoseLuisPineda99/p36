import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("miDB");
  const usersCollection = db.collection("users");

  try {
    switch (req.method) {
      case "GET": {
        const users = await usersCollection.find().toArray();
        return res.json(users);
      }
      case "POST": {
        const { name, email } = req.body;
        if (!name || !email) {
          return res.status(400).json({ error: "Faltan datos" });
        }
        const result = await usersCollection.insertOne({ name, email });
        return res.json(result);
      }
      case "PUT": {
        const { id, name, email } = req.body;
        if (!id) return res.status(400).json({ error: "Falta ID" });

        const result = await usersCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { name, email } }
        );
        return res.json(result);
      }
      case "DELETE": {
        const { id } = req.body;
        if (!id) return res.status(400).json({ error: "Falta ID" });

        const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
        return res.json(result);
      }
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Método ${req.method} no permitido`);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
