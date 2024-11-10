import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_lambda as lambda, aws_apigateway as apigateway } from 'aws-cdk-lib';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // MEMO: 本来はここで作成するが、今回 CDK Deploy は実行しないので LocalStack の起動スクリプトで作成する
    // const bucket = new s3.Bucket(this, "Bucket", {
    //   bucketName: "test-bucket",
    // });

    const lambdaPython = new lambda.Function(this, "LambdaPython", {
      code: lambda.Code.fromAsset("../lambda/python"),
      handler: "handler.lambda_handler",
      runtime: lambda.Runtime.PYTHON_3_12,
      environment: {
        BUCKET_NAME: "test-bucket",
      }
    });

    const api = new apigateway.RestApi(this, "Api", {
      endpointTypes: [apigateway.EndpointType.REGIONAL],
    });

    const resourcePython = api.root.addResource("python");
    resourcePython.addMethod("GET", new apigateway.LambdaIntegration(lambdaPython));
  }
}
