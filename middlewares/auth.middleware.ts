import {Request, Response, NextFunction} from "express";

export const checkAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({message: "Access denied"});
    }
    next();
  } catch (e) {
    console.error(e);
    return res.status(403).json({message: "Access denied"});
  }
};
