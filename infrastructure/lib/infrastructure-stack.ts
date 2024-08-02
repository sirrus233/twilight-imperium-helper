import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as certificatemanager from "aws-cdk-lib/aws-certificatemanager";

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const originAccessIdentity = new cloudfront.OriginAccessIdentity(
            this,
            "OriginAccessIdentity"
        );

        const bucket = new s3.Bucket(this, "Bucket");
        bucket.grantRead(originAccessIdentity);

        const certificate = certificatemanager.Certificate.fromCertificateArn(
            this,
            "Certificate",
            "arn:aws:acm:us-east-1:017820696103:certificate/63a14c79-436a-41f1-ba63-97ef6ba60e59"
        );

        const distribution = new cloudfront.Distribution(this, "Distribution", {
            defaultRootObject: "index.html",
            defaultBehavior: {
                origin: new cloudfront_origins.S3Origin(bucket, {
                    originAccessIdentity,
                }),
            },
            certificate: certificate,
            domainNames: [
                "*.twilightimperiumtools.bradleysherman.net",
                "twilightimperiumtools.bradleysherman.net",
            ],
        });

        new cdk.CfnOutput(this, "DistributionDomainName", {
            value: distribution.distributionDomainName,
        });
    }
}
