import { Request, Response } from "express";

const AuthController = {
    index: async (req: Request, res: Response) => {
        res.status(200).send("OK");
    },
    login: async (req: Request, res: Response) => {
        res.status(200).send("OK");
    },
}

export default AuthController;