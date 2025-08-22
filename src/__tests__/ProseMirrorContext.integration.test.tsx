/* Copyright (c) The New York Times Company */
import { render } from "@testing-library/react";
import { Schema } from "prosemirror-model";
import { EditorState } from "prosemirror-state";
import React from "react";

import { ProseMirror } from "../components/ProseMirror.js";
import { ProseMirrorDoc } from "../components/ProseMirrorDoc.js";
import { reactKeys } from "../plugins/reactKeys.js";
import { useProseMirrorContext } from "../ProseMirrorContext.js";

// Test component that uses the hook
function TestConsumer() {
  const view = useProseMirrorContext();
  return (
    <div data-testid="consumer">
      {view ? "has-editor-view" : "no-editor-view"}
    </div>
  );
}

describe("useProseMirrorContext integration", () => {
  it("should provide EditorView when used within ProseMirror component", () => {
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

    function TestEditor() {
      return (
        <ProseMirror defaultState={editorState}>
          <ProseMirrorDoc data-testid="editor" />
          <TestConsumer />
        </ProseMirror>
      );
    }

    const { getByTestId } = render(<TestEditor />);
    
    // The consumer should have access to the EditorView
    expect(getByTestId("consumer").textContent).toBe("has-editor-view");
  });

  it("should return null when used outside ProseMirror component", () => {
    const { getByTestId } = render(<TestConsumer />);
    expect(getByTestId("consumer").textContent).toBe("no-editor-view");
  });
});