import { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  id: string;
}

declare module 'next' {
  interface NextApiRequest {
    user?: JwtPayload & { id: string }; // Adjust this according to your user structure
  }
}

