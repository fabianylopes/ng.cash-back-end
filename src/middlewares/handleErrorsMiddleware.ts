import { NextFunction, Request, Response } from "express";

export default function handleErrorsMiddleware(error, req: Request, res: Response, next: NextFunction) {
    
  console.log("Error: ", error);

  if(error.type){
      res.status(errorTypeToStatusCode(error.type)).send(error.message);
  }

  return res.sendStatus(500);
}

function errorTypeToStatusCode(type: string) {
  if (type === "unauthorized") return 401;
  if (type === "not found") return 404;
  if (type === "conflict") return 409;
}