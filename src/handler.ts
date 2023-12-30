import { S3 } from 'aws-sdk';

const s3 = new S3();

export const main = async () => {
  const bucketName = process.env.BUCKET_NAME;
  const objectKey = 'data.json';

  try {
    const data = await s3.getObject({ Bucket: bucketName, Key: objectKey }).promise();
    const metadata = await s3.headObject({ Bucket: bucketName, Key: objectKey }).promise();

    return {
      contents: data.Body.toString('utf-8'),
      metadata: metadata.Metadata
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Error retrieving file from S3'
    };
  }
};
