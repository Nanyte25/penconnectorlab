import React, { useReducer } from "react";

export function Checkbox() {
  const [checked, toggle] = useReducer(
    checked => !checked,
    false
  );
  return (
    <>
      <label htmlFor>
        {checked ? "checked" : "not checked"}
      </label>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={toggle}
      />
    </>
  );
}
