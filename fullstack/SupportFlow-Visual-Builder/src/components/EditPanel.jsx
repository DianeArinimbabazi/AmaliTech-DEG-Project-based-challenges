import React, { useState, useEffect } from "react";

export default function EditPanel({ node, onSave }) {
  const [text, setText] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (node) {
      setText(node.text);
      setOptions(node.options.map((o) => ({ ...o })));
    }
  }, [node]);

  if (!node) {
    return (
      <div className="edit-panel">
        <p className="no-selection">Click a node to edit it</p>
      </div>
    );
  }

  function handleOptionChange(index, value) {
    const updated = [...options];
    updated[index].label = value;
    setOptions(updated);
  }

  function handleAddOption() {
    setOptions([...options, { label: "", nextId: "" }]);
  }

  function handleDeleteOption(index) {
    setOptions(options.filter((_, i) => i !== index));
  }

  function handleSave() {
    onSave({ ...node, text, options });
  }

  return (
    <div className="edit-panel">
      <h3>Edit Node</h3>

      <div className="field">
        <label>Type</label>
        <input value={node.type} readOnly />
      </div>

      <div className="field">
        <label>Question Text</label>
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {node.type !== "end" && (
        <>
          <div className="field">
            <label>Answer Options</label>
            {options.map((opt, i) => (
              <div className="option-row" key={i}>
                <input
                  value={opt.label}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                />
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteOption(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button className="add-option-btn" onClick={handleAddOption}>
            + Add option
          </button>
        </>
      )}

      <button className="save-btn" onClick={handleSave}>
        Save changes
      </button>
    </div>
  );
}
