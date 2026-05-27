import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  res.render("index", {
    styles: "/css/index.css",
  });
});
export default router;
