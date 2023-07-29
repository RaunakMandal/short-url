import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb';

import * as Bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { url, password } = req.body;

  if (!url) {
    return res.status(400).json({ message: "Please enter a URL" });
  }

  if (!password) {
    return res.status(400).json({ message: "Please enter a password" });
  }

  const shortUrl = generateShortUrl();
  const hasedPassword = Bcrypt.hashSync(password, 10);

  try {
    const result = await saveShortUrlToDB(url, hasedPassword, shortUrl);
    return res.status(201).json({ message: "success: Short URL created", shortUrl: result.shortUrl });
  } catch (err) {
    return res.status(500).json({ message: "error: Internal server error" });
  }
}

const generateShortUrl = () => {
  const shortUrl = Math.random().toString(36).substring(2, 10);
  return shortUrl;
}

const saveShortUrlToDB = async (url: string, password: string, shortUrl: string) : Promise<any> => {
  const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`;
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db();
  const urlsCollection = db.collection("urls");

  const existingUrl = await urlsCollection.findOne({ url: url });
  if (existingUrl) {
    return existingUrl;
  }

  const result = await urlsCollection.insertOne({
    url: url,
    password: password,
    shortUrl: shortUrl,
    views: 0,
  });

  client.close();

  return result;
}

export type T_Api_Res_GenerateShortUrl = {
  message: string;
  shortUrl: string;
};
