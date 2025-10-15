# Custom Shop Module

This is a custom Nuxt module for extending the PlentyONE PWA shop functionality.

## Purpose

This module allows you to:

- Override core components without modifying the repository files
- Add custom blocks, settings, and components
- Keep customizations separate from core updates

## Structure

```
CustomShopModule/
├── index.ts                    # Module definition
├── README.md                   # This file
└── runtime/
    └── components/
        ├── blocks/             # Custom content blocks (auto-discovered)
        │   └── CustomBlock.vue
        └── settings/           # Custom settings panels (auto-discovered)
            └── CustomFeature/
                ├── View.vue
                └── 1.general/
                    └── GeneralSettings.vue
```

## Auto-Discovery System

Components in this module are automatically discovered and loaded by the PWA's import system:

1. **Blocks** (`runtime/components/blocks/`) - Loaded by `utils/blocks-imports.ts`
2. **Settings** (`runtime/components/settings/`) - Loaded by `utils/settings-groups-imports.ts`
3. **Triggers** (`runtime/components/**/settings/*/*ToolbarTrigger.vue`) - Loaded by `utils/triggers-imports.ts`

## Naming Conventions

- **Blocks**: PascalCase (e.g., `CustomProductCard.vue`)
- **Settings Groups**: Folders with numeric prefixes for ordering (e.g., `1.general/`, `2.advanced/`)
- **Settings Views**: Must be named `View.vue`
- **Toolbar Triggers**: Must end with `ToolbarTrigger.vue`

## Override Priority

Components in this module will override:

- ✅ Core components (`apps/web/app/components/`)
- ⚠️ But will be overridden by NPM modules (`node_modules/*/runtime/components/`)

## Usage

The module is automatically registered in `nuxt.config.ts`:

```typescript
modules: [
  // ...
  './modules/CustomShopModule',
];
```

## Examples

See the example components in `runtime/components/` for reference.
