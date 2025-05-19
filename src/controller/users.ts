import { Request, Response } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

type bodyType = {
  email: string,
  password: string
}
export async function register(req: Request, res: Response) {
  const body: bodyType = req.body;
  if (body.email === '' || body.password === "") {
    res.status(400).send("email and password is required")
    return
  }
  const user = await prisma.user.findFirst({ where: { email: body.email } })
  if (user) {
    res.status(400).send("user already exist")
    return
  }
  const hashPassword = await bcrypt.hash(body.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: body.email,
      password: hashPassword,
    }
  })

  res.status(200).send("suucess")
  return
}
const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY"
export async function loginHandle(req: Request, res: Response) {
  const body: bodyType = req.body;
  if (body.email === '' || body.password === "") {
    res.status(400).send("email and password is required")
    return
  }
  const user = await prisma.user.findFirst({ where: { email: body.email } })
  if (!user) {
    res.status(400).send("user not exist")
    return
  }
  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    res.status(400).send("email/password wrong")
    return
  }
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1D' });


  res.status(200).json({ email: body.email, token })
  return
}
