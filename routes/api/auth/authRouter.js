import express from "express";

import ctrl from "../../../controllers/auth-controller.js";
import { validateBody } from "../../../decorators/index.js";
import { schemas } from "../../../models/user.js";
import { authenticate, upload } from "../../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrl.register
);

authRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);
authRouter.post("/logout", authenticate, ctrl.logout);
authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  validateBody(schemas.updateAvatarSchema),
  ctrl.updateAvatar
);

export default authRouter;
