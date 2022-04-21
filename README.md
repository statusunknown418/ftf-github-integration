# What's this?

This is a simple app that implements the Github Api and allows to search for any user -> get a repo from him/her -> and see a commit history (github.com like format).

_Developed by [me](https://github.com/AlvaroAquijeDiaz)_

**Note: this project uses a github access token in order to process more than 1 request per minute**

## Local setup

The easiest way to look at the final product is going to this [production_deployment](https://ftf-github-integration.vercel.app)

1. Clone the repo.
2. `cd` into it and:

```bash
$ pnpm i (recommended)

# or
$ yarn i
```

_To install pnpm you can just do `brew install pnpm` or `volta install pnpm` (learn more about volta [here](https://volta.sh)) or `npm i -g pnpm`_

3. Create an `.env.local` at the top level of the project and fill it following this format:

| key                      | value                                                                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEXT_PUBLIC_API_KEY      | An access token generated on GitHub, learn how to do it [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) |
| NEXT_PUBLIC_BASE_API_URL | simply use `https://api.github.com`                                                                                                                                             |

4.  Finally:

```bash
# To run locally

$ pnpm dev # if used pnpm (recommended)
$ yarn dev # if you used yarn

```
