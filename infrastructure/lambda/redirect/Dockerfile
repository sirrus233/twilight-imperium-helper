FROM haskell:9.4.8

ARG ASSET_DIR=/asset
ARG WORKDIR=/app
ARG FUNC_NAME=redirect

WORKDIR ${WORKDIR}

RUN cabal update

COPY ./${FUNC_NAME}.cabal ${WORKDIR}

RUN cabal build --only-dependencies -j4

COPY . ${WORKDIR}

RUN cabal build

RUN mkdir -p ${ASSET_DIR} \
    && cp $(cabal list-bin exe:bootstrap) ${ASSET_DIR}/bootstrap


# # Add just the .cabal file to capture dependencies
# COPY ./example.cabal /opt/example/example.cabal

# # Docker will cache this command as a layer, freeing us up to
# # modify source code without re-installing dependencies
# # (unless the .cabal file changes!)
# RUN cabal build --only-dependencies -j4

# # Add and Install Application Code
# COPY . /opt/example
# RUN cabal install

# CMD ["example"]


# # Install AWS Lambda runtime interface client
# RUN apt-get update && apt-get install -y \
#     zlib1g-dev \
#     libtinfo-dev \
#     libgmp-dev \
#     libssl-dev \
#     && cabal update \
#     && cabal install aws-lambda-haskell-runtime

# # Set the working directory
# WORKDIR /app

# # Copy the Haskell project into the container
# COPY . /app

# # Build the Haskell project
# RUN cabal build

# # Package the binary into a zip file for Lambda
# RUN mkdir -p /asset \
#     && cp $(cabal list-bin exe:your-executable) /asset/bootstrap \
#     && cd /asset && zip lambda.zip bootstrap

# # The output zip file will be ready for deployment
# CMD ["cp", "/out/lambda.zip", "/lambda-out"]