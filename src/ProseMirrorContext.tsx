/* Copyright (c) The New York Times Company */
import type { EditorView } from "prosemirror-view";
import { createContext, useContext } from "react";

/**
 * React context that provides access to the ProseMirror EditorView instance.
 *
 * This context is provided by the ProseMirror component and allows consumers
 * to access the EditorView for operations like nodeDOM(pos), scrolling to
 * nodes/positions, and other EditorView APIs.
 */
export const ProseMirrorContext = createContext<EditorView | null>(null);

/**
 * Hook to access the ProseMirror EditorView instance.
 *
 * @returns The current EditorView instance, or null if called outside
 *          of a ProseMirror component or if the editor is not yet mounted.
 *
 * @example
 * ```tsx
 * import { useProseMirrorContext } from '@handlewithcare/react-prosemirror';
 *
 * function MyComponent() {
 *   const view = useProseMirrorContext();
 *
 *   const scrollToPosition = (pos: number) => {
 *     if (view) {
 *       const coords = view.coordsAtPos(pos);
 *       view.dom.scrollIntoView({ block: 'nearest' });
 *     }
 *   };
 *
 *   const getNodeDOM = (pos: number) => {
 *     if (view) {
 *       return view.nodeDOM(pos);
 *     }
 *     return null;
 *   };
 *
 *   // ... rest of component
 * }
 * ```
 */
export function useProseMirrorContext(): EditorView | null {
  return useContext(ProseMirrorContext);
}
