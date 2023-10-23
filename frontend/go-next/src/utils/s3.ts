// import AWS from 'aws-sdk';
import { S3 } from '@aws-sdk/client-s3';
// import { fromEnv } from '@aws-sdk/credential-provider-env';

// AWS.config.update({
//   accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
//   secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
//   region: 'us-west-1',
// });

const getCredentials = () => {
  const test = import.meta.env.VITE_TESTKEY;
  console.log(import.meta.env);
  return {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  };
};

const s3Client = new S3({
  credentials: getCredentials(),
  region: 'us-west-1',
});

export default s3Client;
