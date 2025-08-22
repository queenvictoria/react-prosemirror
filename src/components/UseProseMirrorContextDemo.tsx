/* Copyright (c) The New York Times Company */
import { Schema } from "prosemirror-model";
import { EditorState, TextSelection } from "prosemirror-state";
import React from "react";

import { useProseMirrorContext } from "../ProseMirrorContext.js";
import { ProseMirror } from "./ProseMirror.js";
import { ProseMirrorDoc } from "./ProseMirrorDoc.js";
import { reactKeys } from "../plugins/reactKeys.js";

// Demo component that uses the new hook
function ViewInspector() {
  const view = useProseMirrorContext();

  const logViewInfo = () => {
    if (view) {
      // eslint-disable-next-line no-console
      console.log("EditorView DOM:", view.dom);
      // eslint-disable-next-line no-console
      console.log("Editor State:", view.state);
      // eslint-disable-next-line no-console
      console.log("Document size:", view.state.doc.nodeSize);
      
      // Example of using nodeDOM
      try {
        const nodeDOM = view.nodeDOM(0);
        // eslint-disable-next-line no-console
        console.log("DOM node at position 0:", nodeDOM);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("Could not get nodeDOM at position 0:", e);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("No EditorView available");
    }
  };

  const scrollToTop = () => {
    if (view) {
      // Use ProseMirror's native scrolling instead of DOM API
      const tr = view.state.tr
        .setSelection(TextSelection.atStart(view.state.doc))
        .scrollIntoView();
      view.dispatch(tr);
    }
  };

  const scrollToSelection = () => {
    if (view) {
      // ProseMirror doesn't have scrollToSelection, but we can simulate it
      const tr = view.state.tr.scrollIntoView();
      view.dispatch(tr);
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <button onClick={logViewInfo} style={{ marginRight: "10px" }}>
        Log View Info
      </button>
      <button onClick={scrollToTop} style={{ marginRight: "10px" }}>
        Scroll to Top
      </button>
      <button onClick={scrollToSelection}>
        Scroll to Selection
      </button>
      <p>View available: {view ? "✅" : "❌"}</p>
    </div>
  );
}

export function UseProseMirrorContextDemo() {
  const schema = new Schema({
    nodes: {
      text: {},
      doc: { content: "text*" },
    },
  });

  const editorState = EditorState.create({
    schema,
    plugins: [reactKeys()],
  });

  return (
    <div>
      <h3>useProseMirrorContext Demo</h3>
      <ProseMirror defaultState={editorState}>
        <ViewInspector />
        <ProseMirrorDoc style={{ border: "1px solid #ccc", padding: "10px" }} />
      </ProseMirror>
    </div>
  );
}