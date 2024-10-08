// @ts-check
export const handler = async (event) => {
    const request = event.Records[0].cf.request;
    const headers = request.headers;
    return headers.host[0].value.startsWith("www.")
        ? {
              status: "301",
              statusDescription: "Moved Permanently",
              headers: {
                  location: [
                      {
                          key: "Location",
                          value: `https://${headers.host[0].value.replace(
                              "www.",
                              ""
                          )}${request.uri}`,
                      },
                  ],
              },
          }
        : request;
};
