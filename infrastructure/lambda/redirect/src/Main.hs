{-# LANGUAGE DeriveGeneric #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE OverloadedStrings #-}

module Main where

import AWS.Lambda.Runtime (pureRuntime)
import Data.Aeson
import Data.Text (Text)
import qualified Data.Text as T (stripPrefix)
import GHC.Generics (Generic)

-- Request Type

data CloudFrontRequest = CloudFrontRequest {domain :: Text, uri :: Text} deriving (Generic)

instance FromJSON CloudFrontRequest where
  parseJSON = withObject "CloudFrontRequest" $ \cfr -> do
    records <- cfr .: "Records"
    cf <- records .: "cf"
    request <- cf .: "request"
    headers <- request .: "headers"
    hostList <- headers .: "host"
    case hostList of
      [host] -> CloudFrontRequest <$> host .: "value" <*> request .: "uri"
      _ -> fail $ "Expected exactly 1 'host' value, but received " ++ show (length hostList)

instance ToJSON CloudFrontRequest where
  toEncoding = genericToEncoding defaultOptions

-- Response Types

data CloudFrontMovedResponse = CloudFrontMovedResponse {domain :: Text, uri :: Text} deriving (Generic)

instance ToJSON CloudFrontMovedResponse where
  toJSON (CloudFrontMovedResponse {domain, uri}) =
    object
      [ "status" .= ("301" :: Text),
        "statusDescription" .= ("Moved Permanently" :: Text),
        "headers"
          .= object
            [ "location"
                .= [ object
                       [ "key" .= ("Location" :: Text),
                         "value" .= ("https://" <> domain <> uri)
                       ]
                   ]
            ]
      ]

newtype CloudFrontResponse = CloudFrontResponse {response :: Either CloudFrontRequest CloudFrontMovedResponse}

instance ToJSON CloudFrontResponse where
  toJSON (CloudFrontResponse (Left a)) = toJSON a
  toJSON (CloudFrontResponse (Right a)) = toJSON a

-- Handler

handler :: CloudFrontRequest -> CloudFrontResponse
handler request@(CloudFrontRequest domain uri) = case T.stripPrefix "www." domain of
  Just strippedDomain -> CloudFrontResponse $ Right $ CloudFrontMovedResponse strippedDomain uri
  Nothing -> CloudFrontResponse $ Left request

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