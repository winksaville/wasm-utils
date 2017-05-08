/// <reference types="node" />
/// <reference types="webassembly-js-api" />
import * as fs from "fs";
/**
 * Stat a file
 *
 * @param path to file
 * @return stats: fs.Stats
 * @throws Error(string)
 */
export declare function statAsync(path: string): Promise<fs.Stats>;
/**
 * Use unlink a file
 *
 * @param path to file
 * @param throwOnErr a boolean which throws an error
 * @return path as Promise<string>
 * @throws Error(string)
 */
export declare function unlinkAsync(path: string, throwOnErr?: boolean): Promise<string>;
/**
 * Read the file and return a Uint8Array
 *
 * @param filePath is the path to the input file
 * @return data: Uint8Array
 * @throws Error(string)
 */
export declare function readFileAsync(filePath: string): Promise<Uint8Array>;
/**
 * Compile bc to s
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
export declare function bc2s(inputPath: string, outputPath: string): Promise<string>;
/**
 * Compile s to wasm
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
export declare function s2wasm(inputPath: string, outputPath: string): Promise<string>;
/**
 * Compile wast to wasm
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
export declare function wast2wasm(inputPath: string, outputPath: string): Promise<string>;
/**
 * Compile wasm to wast
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
export declare function wasm2wast(inputPath: string, outputPath: string): Promise<string>;
/**
 * Merge wasm files
 *
 * @param inputPaths is an array of input wasm files
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
export declare function wasm_merge(inputPaths: string[], outputPath: string): Promise<string>;
/**
 * Compile wasm to WebAssembly.Module
 *
 * @param wasmFilePath is path to the file to instantiate
 * @return WebAssembly.Module
 * @throws Error(string)
 */
export declare function wasm2WasmModule(wasmFilePath: string): Promise<WebAssembly.Module>;
/**
 * WebAssembly.Module to WebAssembly.Instance
 *
 * @param mod is a WebAssembly.Module to instantiate
 * @param imports is an optional parameter of the imports needed by the module
 * @return WebAssembly.Instance
 * @throws Error(string)
 */
export declare function module2WasmInstance(mod: WebAssembly.Module, imports?: any): Promise<WebAssembly.Instance>;
/**
 * Use clang to compile code to bc
 *
 * @param inputPath is the input file
 * @param outputPath is the output file
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
export declare function clang2bc(inputPath: string, outputPath: string): Promise<string>;
/**
 * clang2wasm
 *
 * @param inputPath to a c file
 * @param optional outDir path, if none path.dirname(inputPath)
 * @param optional tempDir path, if none path.dirname(inputPath)
 * @return outputPath as Promise<string>
 * @throws Error(string)
 */
export declare function clang2wasm(inputPath: string, outDir?: string, tempDir?: string): Promise<string>;
/**
 * Compile a C file to a WebAssembly.Module using clang
 *
 * @param inputPath to a c file
 * @param optional outDir path, if none path.dirname(inputPath)
 * @param optional tempDir path, if none path.dirname(inputPath)
 * @return Promise<WebAssembly.Module>
 * @throws Error(string)
 */
export declare function clang2WasmModule(inputPath: string, outDir?: string, tempDir?: string): Promise<WebAssembly.Module>;
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
export declare function clang2WasmInstance(inputPath: string, imports?: any, outDir?: string, tempDir?: string): Promise<WebAssembly.Instance>;
/**
 * Display a modules export array
 *
 * @param mod is a WebAssembly module to display the exports
 * @param s is a sting to print on the first line
 */
export declare function displayWasmModuleExports(mod: WebAssembly.Module, prompt?: string): void;
/**
 * Display a modules import array
 *
 * @param prompt is a sting to print on the first line
 * @param mod is a WebAssembly module to display the exports
 */
export declare function displayWasmModuleImports(mod: WebAssembly.Module, prompt?: string): void;
