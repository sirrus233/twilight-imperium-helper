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

        const s3Origin = new cloudfront_origins.S3Origin(bucket, {
            originAccessIdentity,
        });

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
            "arn:aws:acm:us-east-1:017820696103:certificate/eeee851f-e32f-4c55-9d15-5ffe9ee4c258"
        );

        const distribution = new cloudfront.Distribution(this, "Distribution", {
            certificate: certificate,
            defaultRootObject: "index.html",
            domainNames: [
                "twilight-imperium-tools.com",
                "*.twilight-imperium-tools.com",
            ],
            defaultBehavior: {
                origin: s3Origin,
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
            additionalBehaviors: {
                "/assets/*": {
                    origin: s3Origin,
                },
            },
        });

        new cdk.CfnOutput(this, "DistributionDomainName", {
            value: distribution.distributionDomainName,
        });
    }
}
