import React from "react";

class ProgramSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <fieldset style={{ marginBottom: "20px" }}>
        <legend>Sélectionner le programme :</legend>
        <div onChange={(event) => this.props.onChange(event)}>
          <div>
            <input type="radio" value="data" name="data" /> Programme rempli
          </div>
          <div>
            <input type="radio" value="dataWithNoShowSlots" name="data" />{" "}
            Programme incomplet
          </div>
        </div>
      </fieldset>
    );
  }
}

export default ProgramSelector;
