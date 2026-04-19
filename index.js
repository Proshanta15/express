// const express = require("express");
import express from "express";
import { about } from "./pages/about.js";
import home from "./pages/home.js";
const app = express();

app.get("/", (req, res) => {
  res.send(home());
});

app.get("/about", (req, res) => {
  res.send(about());
});

app.listen(3000);
