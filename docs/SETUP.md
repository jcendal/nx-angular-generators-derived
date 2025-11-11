# Setup Guide - Getting Started with Nx Release

Follow these steps to set up and use Nx Release for versioning and npm
publishing.

## Step 1: Commit All Changes

First, commit all the configuration files:

```bash
git add .
git commit -m "feat: configure nx release for versioning and npm publishing"
```

## Step 2: Set Initial Version (First Time Only)

Since this is a new project, you need to set an initial version. You have two
options:

### Option A: Set version manually in package.json

Edit `package.json` and change the version from `0.0.0` to `1.0.0`:

```json
"version": "1.0.0"
```

Then commit and create a tag:

```bash
git add package.json
git commit -m "chore: set initial version to 1.0.0"
git tag v1.0.0
git push origin main --tags
```

### Option B: Use nx release with --first-release flag

```bash
npm run release -- --first-release
```

This will set the version to 1.0.0 automatically.

## Step 3: Authenticate with npm

You need to be authenticated with npm to publish packages:

### Option A: Login interactively

```bash
npm login
```

Enter your npm credentials when prompted.

### Option B: Use npm token (for CI/CD)

```bash
export NPM_TOKEN=your_npm_token_here
```

Or add it to your `.npmrc` file (but don't commit it!):

```bash
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> .npmrc
```

**Important:** Add `.npmrc` to `.gitignore` if it contains your token.

## Step 4: Test the Build

Make sure the build works correctly:

```bash
npm run build
```

Verify that `lib/` directory contains:

- `index.js`
- `index.d.ts`
- `cli.js` (with executable permissions)

## Step 5: Make Your First Release

Once everything is set up, you can make releases using conventional commits:

### For a new feature (minor version bump):

```bash
# Make your changes
git add .
git commit -m "feat: add new feature description"
npm run release
```

### For a bug fix (patch version bump):

```bash
git add .
git commit -m "fix: resolve bug description"
npm run release
```

### For a breaking change (major version bump):

```bash
git add .
git commit -m "feat!: breaking change description"
npm run release
```

Or:

```bash
git add .
git commit -m "feat: change description

BREAKING CHANGE: detailed breaking change description"
npm run release
```

## Step 6: Verify Release

After running `npm run release`, verify:

1. **Version updated**: Check `package.json` - version should be updated
2. **Changelog created**: Check `CHANGELOG.md` - should contain release notes
3. **Git tag created**: Run `git tag --list` to see new tag
4. **Published to npm**: Check npm registry or run
   `npm view @jcendal/nx-angular-generators-derived`

## Troubleshooting

### "No changes detected"

If you get "No changes detected" when running release:

- Make sure you have commits since the last tag
- Check that commits follow conventional commit format
- Verify git tags exist: `git tag --list`

### "Not authenticated with npm"

If you get authentication errors:

- Run `npm login` to authenticate
- Or set `NPM_TOKEN` environment variable
- Check `.npmrc` file exists and is configured

### "Build failed"

If build fails during release:

- Run `npm run build` manually to see errors
- Fix any build issues
- Ensure all dependencies are installed: `npm install`

## Next Steps

After your first release:

1. Push changes and tags:

   ```bash
   git push origin main
   git push --tags
   ```

2. Continue using conventional commits for future releases
3. Review `docs/RELEASE.md` for detailed release workflow
