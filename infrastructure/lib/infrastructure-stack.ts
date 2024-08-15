import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const originAccessIdentity = new cloudfront.OriginAccessIdentity(
            this,
            "OriginAccessIdentity"
        );

        const bucket = new s3.Bucket(this, "Bucket");
        bucket.grantRead(originAccessIdentity);

        const redirectFunction = new cloudfront.experimental.EdgeFunction(
            this,
            "RedirectFunction",
            {
                runtime: lambda.Runtime.NODEJS_20_X,
                handler: "index.handler",
                code: lambda.Code.fromAsset(
                    path.join(__dirname, "..", "lambda", "redirect")
                ),
            }
        );

        const certificate = certificatemanager.Certificate.fromCertificateArn(
            this,
            "Certificate",
            "arn:aws:acm:us-east-1:017820696103:certificate/631cc256-a281-462d-bf9f-695e815759ec"
        );

        const distribution = new cloudfront.Distribution(this, "Distribution", {
            defaultRootObject: "index.html",
            defaultBehavior: {
                origin: new cloudfront_origins.S3Origin(bucket, {
                    originAccessIdentity,
                }),
                edgeLambdas: [
                    {
                        functionVersion: redirectFunction.currentVersion,
                        eventType:
                            cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
                    },
                ],
                viewerProtocolPolicy:
                    cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            certificate: certificate,
            domainNames: [
                "twilightimperiumtools.bradleysherman.net",
                "*.twilightimperiumtools.bradleysherman.net",
            ],
        });

        new cdk.CfnOutput(this, "DistributionDomainName", {
            value: distribution.distributionDomainName,
        });
    }
}
