import { Request, Response } from "express";
import GroqService from "../services/groqService.js";

type ChatMessage = {
    role: "assistant" | "user"
    text: string
};

export class GroqController {
    constructor (private groqService: GroqService) {}

    converse = async (req: Request, res: Response) => {
        try {
            const { messages } = req.body as { messages?: ChatMessage[] };

            if (!Array.isArray(messages)) {
                return res.status(400).json({
                    message: "Missing messages in request body"
                })
            }

            const result = await this.groqService.converse(messages);

            return res.status(200).json(result);
        } catch(error: any) {
            return res.status(500).json({
                message: error?.message ?? "Failed to process Groq conversation"
            })
        }
    }
}