import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import {
  compose,
  withState,
  withProps,
  branch,
  onlyUpdateForKeys,
  shouldUpdate
} from "recompose";

/*
  withState("formType", "setFormType"),
  branch(({ formType }) => formType === "1", withProps({ formData: "1" })),
  branch(({ formType }) => formType === "2", withProps({ formData: "2" })),
  branch(({ formType }) => formType === "3", withProps({ formData: "3" })),
  branch(({ formType }) => formType === "4", withProps({ formData: "4" }))
*/

export const withHOCSwitch = (state, updater, initial, ...branches) =>
  compose(
    withState(state, updater, initial),
    ...branches.map(({ match, to }) =>
      branch(props => props[state] === match, to)
    )
  );

const App = compose(
  withHOCSwitch(
    "formType",
    "setFormType",
    "",
    { match: "1", to: withProps({ formData: "1" }) },
    { match: "2", to: withProps({ formData: "2" }) },
    { match: "3", to: withProps({ formData: "3" }) },
    { match: "4", to: withProps({ formData: "4" }) }
  )
)(props => {
  return (
    <div className="App">
      <h1> 🤡 Form </h1>
      <form onSubmit={() => alert(JSON.stringify(props.formData))}>
        <select
          name="formType"
          onChange={e => props.setFormType(e.target.value)}
          value={props.formType}
        >
          <option value="">---select a type---</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>
        <div style={{ paddingTop: "16px" }}>
          <button type="submit">Submit form {props.formData}</button>
        </div>
      </form>
    </div>
  );
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
