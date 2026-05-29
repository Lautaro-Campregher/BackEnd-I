import { Router } from "express";

const router = Router();

router.get("/form", (req, res) => {
  res.render("products-form", {
    styles: "/css/form.css",
  });
});

router.get("/", async (req, res, next) => {
  res.render("index", {
    styles: "/css/index.css",
  });
});
export default router;
