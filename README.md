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


## Outputs

### `output`

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
      - uses: philips-labs/tern-action@v0.1.0
        id: scan
        with:
          image: 'alpine:latest'
      - name: cat output
        run: echo ${{ steps.scan.outputs.output }}
```

#### Examples

[example repo](https://github.com/JeroenKnoops/tern-action-examples)

### Contributors

[Thanks goes to these contributors](https://github.com/philips-labs/tern-action/graphs/contributors)!

## License

[MIT License](./LICENSE)
