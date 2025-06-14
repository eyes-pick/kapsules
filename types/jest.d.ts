// Type definitions for Jest
// This file augments the type system to include Jest's custom matchers

import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveBeenCalledTimes(expected: number): R;
      toHaveClass(className: string): R;
      toBeDisabled(): R;
      toHaveBeenCalled(): R;
      toHaveLength(length: number): R;
      toHaveTextContent(content: string | RegExp): R;
      toBeDefined(): R;
      toBe(expected: unknown): R;
      toEqual(expected: unknown): R;
      toBeNull(): R;
      toThrow(expected?: string | Error | RegExp): R;
      toContain(expected: string): R;
    }
  }
}

// This empty export is needed to make TypeScript treat this file as a module
export {};
