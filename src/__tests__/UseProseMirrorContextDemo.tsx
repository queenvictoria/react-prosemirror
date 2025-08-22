/* Copyright (c) The New York Times Company */
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import React from "react";

import { ProseMirror } from "../components/ProseMirror.js";
import { ProseMirrorDoc } from "../components/ProseMirrorDoc.js";
import { reactKeys } from "../plugins/reactKeys.js";
import { useProseMirrorContext } from "../ProseMirrorContext.js";

// Demo component that uses the new hook
function ViewInspector() {
  const view = useProseMirrorContext();

  const logViewInfo = () => {
    if (view) {
      console.log("EditorView DOM:", view.dom);
      console.log("Editor State:", view.state);
      console.log("Document size:", view.state.doc.nodeSize);
      
      // Example of using nodeDOM
      try {
        const nodeDOM = view.nodeDOM(0);
        console.log("DOM node at position 0:", nodeDOM);
      } catch (e) {
        console.log("Could not get nodeDOM at position 0:", e);
      }
    } else {
      console.log("No EditorView available");
    }
  };

  const scrollToTop = () => {
    if (view) {
      view.dom.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <button onClick={logViewInfo} style={{ marginRight: "10px" }}>
        Log View Info
      </button>
      <button onClick={scrollToTop}>
        Scroll to Top
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