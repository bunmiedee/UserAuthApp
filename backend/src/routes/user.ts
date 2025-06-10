import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../entities/User';
import { PostgresStore } from '../utils/Postgres';

interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface TokenPayload {
  id: string;
}

const router = express.Router();

router.post('/register', async (req: RegisterRequest, res: Response) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const repo = PostgresStore.getRepository(User);
    const existing = await repo.findOneBy({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = repo.create({
      firstName,
      lastName,
      email,
      hashedPassword,
      isActive: true
    });
    await repo.save(user);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const repo = PostgresStore.getRepository(User);
    const user = await repo.findOneBy({ email });
    if (!user || !user.hashedPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', async (req: Request, res: Response) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const token = auth.replace('Bearer ', '');
    const { id } = jwt.verify(token, process.env.JWT_SECRET || 'secret') as TokenPayload;

    const repo = PostgresStore.getRepository(User);
    const user = await repo.findOneBy({ id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { email, firstName, lastName } = user;
    return res.status(200).json({ email, firstName, lastName });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;