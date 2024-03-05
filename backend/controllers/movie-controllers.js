// import { decrypt } from "dotenv";
import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
export const addMovie=async(req,res,next)=>{
    
    const extractedToken=req.headers.authorization.split(" ")[1];//Bearer token
    if(!extractedToken && extractedToken.trim()==="")
    {
        return res.status(404).json({message:"TOken not found."});
        
    }
    
    let adminId;
    //verify token

    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err)
        {
            return res.status(400).json({message:`${err.message}`});
        }
        else{
            adminId=decrypted.id;
            return;
        }
    });


    //create movie
    const{title,description,releaseDate,posterUrl,featured,actors}=req.body;
    if(!title && title.trim()==="" && !description && description.trim()==="" && !posterUrl && posterUrl.trim()==="")
    {
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let movie;
    try{
        movie = new Movie({title,description,releaseDate:new Date(`${releaseDate}`)
            ,title,featured,actors,admin: adminId,posterUrl,description});

          const session=   await mongoose.startSession();
          const adminUser=await Admin.findById(adminId);
          session.startTransaction();
          await movie.save({session});
          adminUser.addedMovies.push(movie);
          await adminUser.save({session});
          await session.commitTransaction();
            //  movie=await movie.save();

    }catch(err){
        console.log(err);
    }
    if(!movie){
        return res.status(500).json({message:"request failed"});
    }
    return res.status(201).json({movie});
};
export const getAllMovies=async (req,res,next)=>{
    let movies;
    try{

        movies= await Movie.find();
    }
    catch(err){
        return console.log(err);
    }
    if(!movies){
        return req.status(500).json({message:"request failed"});
    }
    return res.status(200).json({movies});
}
export const getMovieById=async(req,res,nest)=>
{
    const id=req.params.id;
    let movie;
    try{
        movie = await Movie.findById(id);
    }
    catch(err){
        return console.lof(err);
    }
    if(!movie){
        return res.status(404).json({message:"Invalid id"});
    }
    return res.status(400).json({movie});
}