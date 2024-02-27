import express from "express";
import { addMovie, getAllMovies, getMovieById } from "../controllers/movie-controllers.js";
const movieRouter=express.Router();
movieRouter.get("/",getAllMovies);
movieRouter.post("/",addMovie);
movieRouter.get("/:id",getMovieById);
export default movieRouter;