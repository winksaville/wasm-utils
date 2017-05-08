"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const child = require("child_process");
const os = require("os");
/**
 * Stat a file
 *
 * @param path to file
 * @return stats: fs.Stats
 * @throws Error(string)
 */
function statAsync(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (statErr, stats) => {
            if (statErr) {
                return reject(new Error(`statAsync: path=${path} err=${statErr}`));
            }
            return resolve(stats);
        });
    });
}
exports.statAsync = statAsync;
/**
 * Use unlink a file
 *
 * @param path to file
 * @param throwOnErr a boolean which throws an error
 * @return path as Promise<string>
 * @throws Error(string)
 */
function unlinkAsync(path, throwOnErr) {
    try {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (unlinkErr) => {
                if (unlinkErr && throwOnErr) {
                    return reject(new Error(`unlinkAsync: path=${path} err=${unlinkErr}`));
                }
                return resolve(path);
            });
        });
    }
    catch (ex) {
        if (throwOnErr) {
            return Promise.reject(new Error(`unlinkAsync: err=${ex}`));
        }
        else {
            return Promise.resolve(path);
        }
    }
}
exports.unlinkAsync = unlinkAsync;
/**
 * Read the file and return a Uint8Array
 *
 * @param filePath is the path to the input file
 * @return data: Uint8Array
 * @throws Error(string)
 */
function readFileAsync(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(new Error(`readFileAsync: filePath=${filePath} err=${err}`));
                //return reject(`shit`);
                //throw new Error(`readFileAsync: filePath=${filePath} err=${err}`);
            }
            else {
                return resolve(new Uint8Array(data));
            }
        });
    });
}
exports.readFileAsync = readFileAsync;
/**
 * Compile bc to s
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
function bc2s(inputPath, outputPath) {
    let llcPath = path.join(os.homedir(), "prgs", "llvmwasm", "bin", "llc");
    let llc = child.spawn(llcPath, ["-asm-verbose=false", inputPath, "-o", outputPath], { shell: true });
    return new Promise((resolve, reject) => {
        llc.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`llc2s: inputPath=${inputPath} outputPath=${outputPath} code=${code}`));
            }
            else {
                return resolve(outputPath);
            }
        });
    });
}
exports.bc2s = bc2s;
/**
 * Compile s to wasm
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
function s2wasm(inputPath, outputPath) {
    let s2wasmPath = path.join(os.homedir(), "prgs", "binaryen", "bin", "s2wasm");
    let s2w = child.spawn(s2wasmPath, [inputPath, "-o", outputPath], { shell: true });
    return new Promise((resolve, reject) => {
        s2w.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`s2wasm: inputPath=${inputPath} outputPath=${outputPath} code=${code}`));
            }
            else {
                return resolve(outputPath);
            }
        });
    });
}
exports.s2wasm = s2wasm;
/**
 * Compile wast to wasm
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
function wast2wasm(inputPath, outputPath) {
    let wast2wasmPath = path.join(os.homedir(), "prgs", "wabt", "out", "clang", "Debug", "wast2wasm");
    let w2w = child.spawn(wast2wasmPath, [inputPath, "-o", outputPath], { shell: true });
    return new Promise((resolve, reject) => {
        w2w.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`wast2wasm: inputPath=${inputPath} outputPath=${outputPath} code=${code}`));
            }
            else {
                return resolve(outputPath);
            }
        });
    });
}
exports.wast2wasm = wast2wasm;
/**
 * Compile wasm to wast
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
function wasm2wast(inputPath, outputPath) {
    let wasm2wastPath = path.join(os.homedir(), "prgs", "wabt", "out", "clang", "Debug", "wasm2wast");
    let w2w = child.spawn(wasm2wastPath, [inputPath, "-o", outputPath], { shell: true });
    return new Promise((resolve, reject) => {
        w2w.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`wast2wasm: inputPath=${inputPath} outputPath=${outputPath} code=${code}`));
            }
            else {
                return resolve(outputPath);
            }
        });
    });
}
exports.wasm2wast = wasm2wast;
/**
 * Merge wasm files
 *
 * @param inputPaths is an array of input wasm files
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
function wasm_merge(inputPaths, outputPath) {
    let mergerPath = path.join(os.homedir(), "prgs", "binaryen", "bin", "wasm-merge");
    let merger = child.spawn(mergerPath, inputPaths.concat(["-o", outputPath]), { shell: true });
    return new Promise((resolve, reject) => {
        merger.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`wast2wasm: inputPaths=${inputPaths} outputPath=${outputPath} code=${code}`));
            }
            else {
                return resolve(outputPath);
            }
        });
    });
}
exports.wasm_merge = wasm_merge;
/**
 * Compile wasm to WebAssembly.Module
 *
 * @param wasmFilePath is path to the file to instantiate
 * @return WebAssembly.Module
 * @throws Error(string)
 */
function wasm2WasmModule(wasmFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = yield readFileAsync(wasmFilePath);
        return yield WebAssembly.compile(data);
    });
}
exports.wasm2WasmModule = wasm2WasmModule;
/**
 * WebAssembly.Module to WebAssembly.Instance
 *
 * @param mod is a WebAssembly.Module to instantiate
 * @param imports is an optional parameter of the imports needed by the module
 * @return WebAssembly.Instance
 * @throws Error(string)
 */
function module2WasmInstance(mod, imports) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield WebAssembly.instantiate(mod, imports);
    });
}
exports.module2WasmInstance = module2WasmInstance;
/**
 * Use clang to compile code to bc
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
function clang2bc(inputPath, outputPath) {
    let compilerPath = path.join(os.homedir(), "prgs", "llvmwasm", "bin", "clang");
    let compiler = child.spawn(compilerPath, ["-emit-llvm", "--target=wasm32", "-Oz", inputPath, "-c", "-o", outputPath], { shell: true });
    return new Promise((resolve, reject) => {
        compiler.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`clang2bc: inputPath=${inputPath} outputPath=${outputPath} code=${code}`));
            }
            else {
                return resolve(outputPath);
            }
        });
    });
}
exports.clang2bc = clang2bc;
/**
 * clang2wasm
 *
 * @param inputPath to a c file
 * @param optional outDir path, if none path.dirname(inputPath)
 * @param optional tempDir path, if none path.dirname(inputPath)
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
function clang2wasm(inputPath, outDir, tempDir) {
    return __awaiter(this, void 0, void 0, function* () {
        let fileName = path.basename(inputPath);
        let dirName = path.dirname(inputPath);
        if (!outDir)
            outDir = dirName;
        if (!tempDir)
            tempDir = dirName;
        let bcPath = yield clang2bc(inputPath, path.join(tempDir, `${fileName}.bc`));
        let sPath = yield bc2s(bcPath, path.join(tempDir, `${fileName}.s`));
        let wastPath = yield s2wasm(sPath, path.join(outDir, `${fileName}.wast`));
        return yield wast2wasm(wastPath, path.join(outDir, `${fileName}.wasm`));
    });
}
exports.clang2wasm = clang2wasm;
/**
 * Compile a C file to a WebAssembly.Module using clang
 *
 * @param inputPath to a c file
 * @param optional outDir path, if none path.dirname(inputPath)
 * @param optional tempDir path, if none path.dirname(inputPath)
 * @return Promise<WebAssembly.Module>
 * @throws Error(string)
 */
function clang2WasmModule(inputPath, outDir, tempDir) {
    return __awaiter(this, void 0, void 0, function* () {
        let wasmFile = yield clang2wasm(inputPath, outDir, tempDir);
        return yield wasm2WasmModule(wasmFile);
    });
}
exports.clang2WasmModule = clang2WasmModule;
/**
 * Compile a C file to a WebAssembly.Instance using clang
 *
 * @param inputPath to a c file
 * @param optional imports for the module
 * @param optional outDir path, if none path.dirname(inputPath)
 * @param optional tempDir path, if none path.dirname(inputPath)
 * @return Promise<WebAssembly.Instance>
 * @throws Error(string)
 */
function clang2WasmInstance(inputPath, imports, outDir, tempDir) {
    return __awaiter(this, void 0, void 0, function* () {
        let mod = yield clang2WasmModule(inputPath, outDir, tempDir);
        return yield module2WasmInstance(mod, imports);
    });
}
exports.clang2WasmInstance = clang2WasmInstance;
/**
 * Display a modules export array
 *
 * @param mod is a WebAssembly module to display the exports
 * @param s is a sting to print on the first line
 */
function displayWasmModuleExports(mod, prompt) {
    let exports = WebAssembly.Module.exports(mod);
    console.log(`${prompt ? prompt + " " : ""}length=${exports.length}`);
    for (let i in exports) {
        let v = exports[i];
        console.log(`${prompt ? prompt : ""}[${i}] name=${v.name} kind=${v.kind}`);
    }
}
exports.displayWasmModuleExports = displayWasmModuleExports;
/**
 * Display a modules import array
 *
 * @param prompt is a sting to print on the first line
 * @param mod is a WebAssembly module to display the exports
 */
function displayWasmModuleImports(mod, prompt) {
    let imports = WebAssembly.Module.imports(mod);
    console.log(`${prompt ? prompt + " " : ""}length=${imports.length}`);
    for (let i in imports) {
        let v = imports[i];
        console.log(`${prompt ? prompt : ""}[${i}] name=${v.name} kind=${v.kind}`);
    }
}
exports.displayWasmModuleImports = displayWasmModuleImports;
//# sourceMappingURL=utils.js.map