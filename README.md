<div align="center">

# GitHub Action to VMWARE's tern!

[![Marketplace](https://img.shields.io/badge/GitHub-Marketplace-green.svg)](https://github.com/marketplace/actions/tern) [![Release](https://img.shields.io/github/release/philips-labs/tern-action.svg)](https://github.com/philips-labs/tern-action/releases) ![.github/workflows/lint.yml](https://github.com/philips-labs/tern-action/workflows/.github/workflows/lint.yml/badge.svg)

This Action wraps [`tern`](https://github.com/tern-tools/tern) allowing scanning of your docker images!

> :warning: **Not finished yet**: Work in Progress. This action will be based on [this github action workflow](https://github.com/JeroenKnoops/scan-docker-image/blob/master/.github/workflows/scan-tern.yml)

</div>

## Contents

- [Inputs](#inputs)
- [Environment Variables](#environment-variables)
- [Example Usage](#example-usage)
    - [Vanilla](#vanilla)
- [License](#license)

## Inputs

### `image`

**Required** docker image to scan. Example: `alpine:latest` 

### `format`

Output format. Can be either: `json`, `html`, `spdxtagvalue`, `yaml` or `human`

**Optional** defaults to `json`

### `output`

**Optional** Name of the output file. Defaults to `tern.<format>`

## Outputs

### `output`

output JSON string

### `file`

output JSON file.

## Environment Variables

## Example Usage

### Vanilla

`tern` CLI will automatically scan your image`:

```yaml
name: build 
on: [push]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: philips-labs/tern-action@v0.2.0
        id: scan
        with:
          image: alpine:latest
          format: yaml
          output: alpine.yaml
      - uses: actions/upload-artifact@v2
        with:
          name: tern 
          path: ${{ steps.scan.outputs.file }} 
```

#### Examples

[example repo](https://github.com/JeroenKnoops/tern-action-examples)

### Contributors

[Thanks goes to these contributors](https://github.com/philips-labs/tern-action/graphs/contributors)!

## License

[MIT License](./LICENSE)
