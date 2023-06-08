import {Request, Response} from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {Role} from "../models/Role";
import {User} from "../models/User";
import {Types} from "mongoose";

export class AuthController {
  private static generateAccessToken(id: Types.ObjectId, role: string): string {
    return jwt.sign({id, role}, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  async registration(req: Request, res: Response): Promise<Response> {
    try {
      const {username, password} = req.body;
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({username, password: hashPassword, role: "User"});
      await user.save();
      return res
        .status(200)
        .json({message: `User's ${username} registration successful`});
    } catch (e) {
      console.error(e);
      return res.status(400).json({message: "Registration error"});
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({message: "User not found"});
      }
      const validPassword = bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: "Wrong password"});
      }
      const token = AuthController.generateAccessToken(
        user._id,
        user.role as string
      );
      return res.status(200).json({token});
    } catch (e) {
      console.error(e);
      return res.status(400).json({message: "Login error"});
    }
  }

  async addRole(req: Request, res: Response): Promise<Response> {
    try {
      const name = req.body.name;
      const role = new Role({name});
      await role.save();
      return res.status(200).json({message: `Role ${name} successfully added`});
    } catch (e) {
      console.error(e);
      return res.status(400).json({message: "Adding role error"});
    }
  }
}
