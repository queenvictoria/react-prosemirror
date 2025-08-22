/* Copyright (c) The New York Times Company */
import { render } from "@testing-library/react";
import type { EditorView } from "prosemirror-view";
import React from "react";

import {
  ProseMirrorContext,
  useProseMirrorContext,
} from "../ProseMirrorContext.js";

function TestComponent() {
  const view = useProseMirrorContext();
  return <div data-testid="view-status">{view ? "has-view" : "no-view"}</div>;
}

describe("useProseMirrorContext", () => {
  it("should return null when used outside of ProseMirrorContext", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("view-status").textContent).toBe("no-view");
  });

  it("should return null when context value is null", () => {
    const { getByTestId } = render(
      <ProseMirrorContext.Provider value={null}>
        <TestComponent />
      </ProseMirrorContext.Provider>
    );
    expect(getByTestId("view-status").textContent).toBe("no-view");
  });

  it("should return the EditorView when context provides one", () => {
    const mockView = {
      dom: document.createElement("div"),
    } as unknown as EditorView;

    const { getByTestId } = render(
      <ProseMirrorContext.Provider value={mockView}>
        <TestComponent />
      </ProseMirrorContext.Provider>
    );
    expect(getByTestId("view-status").textContent).toBe("has-view");
  });

  it("should return the correct EditorView instance", () => {
    const mockView = {
      dom: document.createElement("div"),
      state: { doc: { nodeSize: 1 } },
    } as unknown as EditorView;

    function TestViewComponent() {
      const view = useProseMirrorContext();
      return (
        <div data-testid="view-data">
          {view && view.state ? "correct-view" : "incorrect-view"}
        </div>
      );
    }

    const { getByTestId } = render(
      <ProseMirrorContext.Provider value={mockView}>
        <TestViewComponent />
      </ProseMirrorContext.Provider>
    );
    expect(getByTestId("view-data").textContent).toBe("correct-view");
  });
});
