import express from 'express';
import cors from 'cors';
import todosRouter from './routes/todos'

const app = express();

const whitelist = ['http://localhost:3000', 'http://192.168.1.44:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
}

app.use(express.json())
app.use(cors(corsOptions))
app.use('/todos', todosRouter);

app.listen(5000, () => {
    console.log("Server started on Part 5000");
})
