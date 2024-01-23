import { Response } from "express";

export default class HttpResponse extends Response{
  static success(res:Response,message:string){
    res.status(200).json({message})
  }

  static creaeted(res:Response,message:string){
    res.status(201).json({message})
  }
}