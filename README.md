# SSTarter Cloudflare

A monorepo SST Cloudflare implementation using Bun as the package manager.

## Get started

1. Clone the repo

```bash
git clone https://github.com/mstibbard/sstarter-cloudflare.git --depth=1 your-app-name
```

2. Change into the directory

```bash
cd your-app-name
```

3. Remove the remote origin

```bash
git remote remove origin
```

4. Rename the files in the project to the name of your app

```bash
bunx replace-in-file '/sstarter-cloudflare/g' your-app-name **/*.* --verbose
```

5. Create your `.env` file and populate it with (your Cloudflare API token)[https://dash.cloudflare.com/profile/api-tokens]

```bash
cp .env.example .env
```

6. Enable Cloudflare R2 (requires credit card details, but there's a generous free tier). This is required as it is where the SST state is stored.

7. Deploy!

```bash
bun install
bunx sst deploy
```

---

Follow me on [Twitter](https://twitter.com/MatthewStibbard) and join the SST community over on [Discord](https://discord.gg/sst).
