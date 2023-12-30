import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';

export class AiderGithubWorkflowsTestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'AiderGithubWorkflowsTestQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'AiderGithubWorkflowsTestTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));

    const bucket = new s3.Bucket(this, 'my-bucket', {
      removalPolicy: s3.RemovalPolicy.DESTROY // NOT recommended for production code
    });

    const lambdaFunction = new lambda.Function(this, 'my-lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'handler.main',
      code: lambda.Code.fromAsset(path.join(__dirname, '../src')),
      environment: {
        BUCKET_NAME: bucket.bucketName
      }
    });

    bucket.grantRead(lambdaFunction);
  }
}
