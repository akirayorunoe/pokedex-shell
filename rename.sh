#!/bin/bash

# Đổi tất cả file __federation_ thành federation-
find dist/assets -name '__federation_*' -exec bash -c 'mv "$1" "${1//__federation_/federation-}"' _ {} \;

# Đổi tất cả file __virtual__ thành virtual-
find dist/assets -name '__virtual__*' -exec bash -c 'mv "$1" "${1//__virtual__/virtual-}"' _ {} \;

# Đổi tất cả file _virtual__ thành virtual-
find dist/assets -name '_virtual__*' -exec bash -c 'mv "$1" "${1//_virtual__/virtual-}"' _ {} \;

echo "✅ Rename completed. Deploying..."
