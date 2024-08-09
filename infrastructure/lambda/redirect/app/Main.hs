{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE NamedFieldPuns #-}

module Main where

import AWS.Lambda.Runtime (pureRuntime)
import Data.Aeson (FromJSON, ToJSON)
import GHC.Generics (Generic)

data CloudFrontRequestEvent = CloudFrontRequestEvent {Records :: String} deriving (Generic)

instance FromJSON CloudFrontRequestEvent

data IdResult = IdResult {output :: String} deriving (Generic)

instance ToJSON IdResult

handler :: IdEvent -> IdResult
handler IdEvent {input} = IdResult {output = input}

main :: IO ()
main = pureRuntime handler

{-
import { CloudFrontRequestEvent, CloudFrontRequestResult } from 'aws-lambda';

export const handler = async (event: CloudFrontRequestEvent): Promise<CloudFrontRequestResult> => {
  const request = event.Records[0].cf.request;
  const headers = request.headers;

  if (headers.host[0].value === 'www.subdomain.bradleysherman.net') {
    return {
      status: '301',
      statusDescription: 'Moved Permanently',
      headers: {
        location: [{
          key: 'Location',
          value: `https://${headers.host[0].value.replace('www.', '')}${request.uri}`
        }]
      }
    };
  }

  return request;
};
-}