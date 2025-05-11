import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService,
} from "../service/user.service";
import {
  buildErrorResponse,
  buildSuccessResponse,
  getResponseErrorMessage,
} from "../../../src/utils/response";

export const getUsersHandler = async (_: Request, res: Response) => {
  try {
    const users = await getUsersService();

    res.status(200).json(buildSuccessResponse("Success", users));
  } catch (error: unknown) {
    const errorMessage = getResponseErrorMessage(error);

    res.status(400).json(buildErrorResponse(errorMessage));
  }
};

export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;
    await createUserService(name, username, password);

    res.status(201).json(buildSuccessResponse(`${name} berhasil dibuat`, null));
  } catch (error: unknown) {
    const errorMessage = getResponseErrorMessage(error);
    res.status(400).json(buildErrorResponse(errorMessage));
  }
};

export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, username, password } = req.body;
    await updateUserService(parseInt(id), name, username, password);

    res
      .status(200)
      .json(buildSuccessResponse(`${name} berhasil diupdate`, null));
  } catch (error: unknown) {
    const errorMessage = getResponseErrorMessage(error);
    res.status(400).json(buildErrorResponse(errorMessage));
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUserService(parseInt(id));

    res.status(200).json(buildSuccessResponse("User berhasil dihapus", null));
  } catch (error) {
    const errorMessage = getResponseErrorMessage(error);
    res.status(400).json(buildErrorResponse(errorMessage));
  }
};
