import {
  handleRefreshToken,
  handleAdminRefresh,
} from "../controllers/refreshTokenController.js";
import { Router } from "express";

const router = Router();

router.get("/", handleRefreshToken);

router.get("/admin", handleAdminRefresh);

export default router;
