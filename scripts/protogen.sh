#!/bin/bash

SCRIPT_DIR=$(cd $(dirname "${BASH_SOURCE[0]}") && pwd)

GRPC_TOOLS_NODE_PROTOC_PLUGIN="${SCRIPT_DIR}/../node_modules/.bin/grpc_tools_node_protoc_plugin"
PROTOC_GEN_TS_PATH="${SCRIPT_DIR}/../node_modules/.bin/protoc-gen-ts"

INDIR=${1}
INCDIR=${2}
OUTDIR=${3}

npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:"${OUTDIR}" \
  --grpc_out=grpc_js:"${OUTDIR}" \
  --plugin=protoc-gen-grpc="${GRPC_TOOLS_NODE_PROTOC_PLUGIN}" \
  -I ${INCDIR} \
  "${INDIR}"/*.proto

npx grpc_tools_node_protoc \
  --plugin=protoc-gen-ts="${PROTOC_GEN_TS_PATH}" \
  --ts_out=grpc_js:"${OUTDIR}" \
  -I ${INCDIR} \
  "${INDIR}"/*.proto
