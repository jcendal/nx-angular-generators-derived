# Nx Angular Generators Derived

A wrapper for Angular generators in Nx that simplifies component and other
element creation, maintaining compatibility with the previous "derived"
behavior.

## ✨ Features

- Simplifies Nx Angular generator syntax
- Automatically duplicates the last path segment for component name
- Automatically adds `.module.ts` to module names
- Compatible with Nx 20+

## 📦 Installation

```bash
npm install @jcendal/nx-angular-generators-derived
```

## 📚 Usage

### Generate a component

Instead of using the full Nx command:

```bash
npx nx g @nx/angular:component libs/shared/ui/toasts/src/lib/component-name/component-name --name=component-name --module=ui-toasts.module.ts
```

You can use the simplified syntax:

```bash
npm run g component libs/shared/ui/toasts/src/lib/component-name --module=ui-toasts
```

### Automatic transformation

The wrapper automatically converts:

- **Input**: `npm run g component <path> --module=<module-name>`
- **Output**:
  `npx nx g @nx/angular:component <path>/<last-segment> --name=<last-segment> --module=<module-name>.module.ts`

### Complete example

```bash
# Simplified command
npm run g component libs/shared/ui/toasts/src/lib/component-name --module=ui-toasts

# Executed internally as:
# npx nx g @nx/angular:component libs/shared/ui/toasts/src/lib/component-name/component-name --name=component-name --module=ui-toasts.module.ts
```

## 🛠 API

### `g` script

The `g` script accepts the following arguments:

- `<generator-type>`: Generator type (e.g., `component`, `service`, etc.)
- `<path>`: Path where the element will be generated
- `[--option=value]`: Additional options for the generator

### Special options

- `--module`: Automatically adds `.module.ts` to the end of the module name

## ⚙️ Configuration

Make sure you have `@nx/angular` installed in your Nx project:

```bash
npm install -D @nx/angular
```

## 📄 License

MIT – Feel free to use, modify, and distribute.
