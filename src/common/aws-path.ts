import { config } from 'dotenv';
config();

export const awsUrl = (name: string) => {
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${name}.jpg`;
};
