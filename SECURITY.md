# Security policy

## Supported version

Security fixes target the current `master` branch.

## Report a vulnerability

Do not open a public issue for a security vulnerability. Contact the maintainer
through the GitHub profile and include the affected route, the expected result,
and clear reproduction steps. Do not include real access tokens or private
repository data.

The application uses a GitHub OAuth token with `repo` scope. The token must stay
on the server. Client code and API responses must not return it to the browser.
