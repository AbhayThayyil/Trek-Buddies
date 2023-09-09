import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

export const bucketName = process.env.S3_BUCKET_NAME;
export const bucketRegion = process.env.S3_BUCKET_REGION;

export const accessKey = process.env.AWS_ACCESS_KEY;
export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const s3 = new S3Client({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
});
