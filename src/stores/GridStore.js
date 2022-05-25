import { BaseStore } from "fluxible/addons";
import Actions from "../app/Actions";

import GridData from "./GridData";
import GridHours from "./GridHours";

class GridStore extends BaseStore {
  static storeName = "GridStore"

  static handlers = {
    [Actions.LOAD_GRID]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data = undefined;
    this.hours = undefined;
  }

  handleApiOk() {
    this.data = JSON.parse(JSON.stringify(GridData));
    this.hours = JSON.parse(JSON.stringify(GridHours));
    this.emitChange();
  }

  getData() { return this.data; }
  getHours() { return this.hours; }

  dehydrate() {
    return {
      data: this.data,
      hours: this.hours,
    };
  }

  rehydrate(state) {
    this.data = state.data;
    this.hours = state.hours;
  }
}

export default GridStore;