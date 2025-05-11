import { Router } from "express";
import { login, register } from "../http/controllers/auth.controller";
import { verifyToken } from "../middleware/Auth.middleware";
import {
  createUserHandler,
  deleteUserHandler,
  getUsersHandler,
  updateUserHandler,
} from "../http/controllers/user.controller";

const router = Router();

router.post("/auth/register", (req, res) => {
  register(req, res);
});
router.post("/auth/login", login);

router.get(
  "/auth/me",
  (req, res, next) => {
    verifyToken(req, res, next);
  },
  (req, res) => {
    res.json({ user: (req as any).user });
  }
);

router.use(verifyToken);

router.get("/users", (req, res) => {
  getUsersHandler(req, res);
});

router.post("/users", (req, res) => {
  createUserHandler(req, res);
});

router.put("/users/:id", (req, res) => {
  updateUserHandler(req, res);
});

router.delete("/users/:id", (req, res) => {
  deleteUserHandler(req, res);
});

export default router;
