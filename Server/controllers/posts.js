import PostMessage from "../models/postMessage.js"
import mongoose from 'mongoose'
export const getPosts=async (req,res)=>{
    try{
        const postMessages= await PostMessage.find();
        res.status(200).json(postMessages);
    }catch(err){
        res.status(404).json({message:err.message });
    }
};

export const createPost=async (req,res)=>{
    const post=req.body;
    const newPost=new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }catch(err){
        res.status(409).json({message:err.message});
    }
}
export const updatePost=async (req,res)=>{
    const id=req.params.id;
    const post=req.body;
    try{
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id");
    const updated=await PostMessage.findByIdAndUpdate(id,{...post,id},{new:true});
    res.status(204).json(updated);
    }
    catch(e){
        console.log(e);
    }
}

export const deletePost=async (req,res)=>{
    const id=req.params.id;
    console.log("called");
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id");
        await PostMessage.findOneAndDelete(id);
        res.status(202).json("deleted successfully");
    }catch(err){console.log(err);}
}

export const likePost=async (req,res)=>{
    const id=req.params.id;
    try{
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("no post with that id");
    const post=await PostMessage.findOne({_id:id});
    const updated=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount+1},{new:true});
    res.json(updated);
    console.log(updated.likeCount);
    }
    catch(e){
        console.log(e);
    }
}
