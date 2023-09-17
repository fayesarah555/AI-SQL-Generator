import express, { Application, Request, Response } from "express";
import cors from "cors";
import OpenAIApi from "openai";

const PORT: number = 3000;
const app: Application = express();

app.use(cors());
app.use(express.json());

const API_KEY: string = 'sk-********'; // Replace with your actual API key

const openai = new OpenAIApi({ apiKey: API_KEY });

app.post("/completions", async (req: Request, res: Response) => {
    try {
        const chatResponse = await openai.chat.completions.create({
            messages: [{ role: "user", content: "Say this is a test" }],
            model: "gpt-3.5-turbo",
        });

        const completionText = chatResponse.choices[0].message.content;

        res.send(completionText);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));
