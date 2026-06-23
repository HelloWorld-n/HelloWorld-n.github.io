// Provide a minimal JSX.IntrinsicElements declaration for environments
// where the global JSX namespace isn't available to avoid TS7026.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
