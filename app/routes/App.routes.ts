import { Router } from "express";
import { login, register } from "../controllers/User.controller";
import { verifyToken } from "../middleware/Auth.middleware";

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

export default router;
