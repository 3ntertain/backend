require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export async function uploadFile(createReadStream, filename) {
  const body = await createReadStream();
  const extention = filename.split('.').pop();
  const newFilename = `${Date.now()}.${extention}`;

  const uploadParams = {
    Bucket: bucketName,
    Body: body,
    Key: newFilename,
  };

  return s3.upload(uploadParams).promise();
}
