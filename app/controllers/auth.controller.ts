import { Request, Response } from "express";
import {
  buildErrorResponse,
  buildSuccessResponse,
} from "../../src/utils/response";
import { loginUser, registerUser } from "../service/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;
    await registerUser(name, username, password);
    res.status(201).json(buildSuccessResponse(`${name} berhasil dibuat`, null));
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(400).json(buildErrorResponse(errorMessage));
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const result = await loginUser(username, password);

    res.status(200).json(buildSuccessResponse("Login Berhasil", result));
  } catch (error: unknown) {
    const errorMessage = (error as Error).message;
    res.status(400).json(buildErrorResponse(errorMessage));
  }
};
