import { Router } from "express";

export const discoverRouter = Router();

discoverRouter.get("/foryou", (req, res) => {
    res.send("For You");
});

discoverRouter.get("/popular", (req, res) => {
    res.send("Popular");
});

discoverRouter.get("/new", (req, res) => {
    res.send("New");
});

discoverRouter.get("/nearby", (req, res) => {
    res.send("Near by");
});
