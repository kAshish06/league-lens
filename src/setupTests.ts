import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Add TextEncoder and TextDecoder polyfills
globalThis.TextEncoder =
  TextEncoder as unknown as typeof globalThis.TextEncoder;
globalThis.TextDecoder =
  TextDecoder as unknown as typeof globalThis.TextDecoder;

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;
