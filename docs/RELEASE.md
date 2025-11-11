# Release Process

This project uses Nx Release for automated versioning and npm publishing.

## Prerequisites

1. Ensure you have an npm account and are logged in:

   ```bash
   npm login
   ```

2. Or set the `NPM_TOKEN` environment variable:
   ```bash
   export NPM_TOKEN=your_npm_token
   ```

## Release Workflow

### Full Release (Version + Publish)

To create a new version and publish to npm:

```bash
npm run release
```

This will:

1. Analyze conventional commits to determine the version bump
2. Build the project
3. Update version in `package.json`
4. Generate/update `CHANGELOG.md`
5. Create a git tag
6. Publish to npm

### Version Only (No Publish)

To create a new version without publishing:

```bash
npm run release:version
```

### Publish Only (No Version)

To publish an already versioned package:

```bash
npm run release:publish
```

## Conventional Commits

The release process uses
[Conventional Commits](https://www.conventionalcommits.org/) to determine
version bumps:

- `feat:` → minor version bump (1.0.0 → 1.1.0)
- `fix:` → patch version bump (1.0.0 → 1.0.1)
- `BREAKING CHANGE:` or `!` → major version bump (1.0.0 → 2.0.0)

### Example Commits

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug in CLI"
git commit -m "feat!: breaking change in API"
```

## Configuration

The release configuration is in `nx.json`:

- **Version Source**: Uses git tags to determine current version
- **Changelog**: Automatically generated from conventional commits
- **Pre-version Command**: Runs `npm run build` before versioning

## Manual Release Steps

If you need to manually release:

1. Update version in `package.json`
2. Build the project: `npm run build`
3. Create git tag: `git tag v1.0.0`
4. Push tags: `git push --tags`
5. Publish: `npm publish`
