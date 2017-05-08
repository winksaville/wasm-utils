# WebAssembly (wasm) utils
Some utilities to allow you to compile and run wasm code.
The current incarnation allows running the stages of
clang to wasm compiliation using node and are async wrappers.

## Prerequisites
- Build clang v5.0, see [Using WebAssembly in LLVM](https://gist.github.com/yurydelendik/4eeff8248aeb14ce763e) into ~/prgs/llvmwasm.
Note: this took my desktop with 32GB of ram on linux my laptop with 16GB of ram wasn't enough.

- Build the do-not-require-memoryBaseGlobals-or-tableBaseGlobals branch from
source [winksaville/binaryen](https://github.com/winksaville/binaryen)
to ~/prgs/binaryen.

- Build from source [wabt](https://github.com/WebAssembly/wabt) to
~/prgs/wabt. Don't for get to do a `git clone --recursive`

- yarn

## Initialize
```
yarn install
yarn initialize
```

## Test
```
$ yarn test
```
or
```
$ yarn test:dbg
```
