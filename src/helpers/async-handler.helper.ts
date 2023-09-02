import {Request, Response, NextFunction} from "express";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => Promise<any>;

export default (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction): void => {
    execution(req, res, next).catch(next);
  };
