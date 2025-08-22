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
 * import { TextSelection } from 'prosemirror-state';
 * import { useEffect } from 'react';
 *
 * function MyComponent({ targetPos }: { targetPos?: number }) {
 *   const view = useProseMirrorContext();
 *
 *   // Scroll programmatically when targetPos changes
 *   useEffect(() => {
 *     if (view && targetPos !== undefined) {
 *       const tr = view.state.tr
 *         .setSelection(TextSelection.create(view.state.doc, targetPos))
 *         .scrollIntoView();
 *       view.dispatch(tr);
 *     }
 *   }, [view, targetPos]);
 *
 *   const getNodeDOM = (pos: number) => {
 *     if (view) {
 *       return view.nodeDOM(pos);
 *     }
 *     return null;
 *   };
 *
 *   const scrollToSelection = () => {
 *     if (view) {
 *       view.scrollToSelection();
 *     }
 *   };
 *
 *   // ... rest of component
 * }
 * ```
 */
export function useProseMirrorContext(): EditorView | null {
  return useContext(ProseMirrorContext);
}
