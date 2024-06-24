import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.json({
        data: "the signup endpoint",
    });
});

router.get("/signin", (req, res) => {
    res.json({
        data: "the signin endpoint",
    });
});


router.get("/signout", (req, res) => {
    res.json({
        data: "the signout endpoint",
    });
});

export default router;