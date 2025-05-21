import { Request, Response, NextFunction } from 'express';

export interface IUrlController {
  shortenUrl(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserUrls(req: Request, res: Response, next: NextFunction): Promise<void>;
  redirectUrl(req: Request, res: Response, next: NextFunction): Promise<void>;
}