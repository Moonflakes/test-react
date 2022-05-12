import { BaseStore } from "fluxible/addons";
import Actions from "../app/Actions";

import GridData from "./GridData";

class GridStore extends BaseStore {
  static storeName = "GridStore"

  static handlers = {
    [Actions.LOAD_GRID]: "handleApiOk",
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.data = undefined;
  }

  handleApiOk() {
    this.data = JSON.parse(JSON.stringify(GridData));
    this.emitChange();
  }

  getData() { return this.data; }

  dehydrate() {
    return {
      data: this.data,
    };
  }

  rehydrate(state) {
    this.data = state.data;
  }
}

export default GridStore;