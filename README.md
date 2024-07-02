# Traefik HTTP Config Merger

This is a simple service that will take multiple JSON endpoints, query them, and return a deep merged JSON result.

This is specifically meant to be used for the Traefik [HTTP Config
Provider](https://doc.traefik.io/traefik/providers/http/), which doesn't support multiple endpoints.

Note this does not support YAML endpoints, only JSON.

