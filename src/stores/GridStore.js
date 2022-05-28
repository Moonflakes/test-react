import { BaseStore } from "fluxible/addons";
import Actions from "../app/Actions";

import GridData from "./GridData";
import GridDataWithNoShowSlots from "./GridDataWithNoShowSlots";

class GridStore extends BaseStore {
  static storeName = "GridStore";

  static handlers = {
    [Actions.LOAD_GRID]: "handleApiOk",
  };

  constructor(dispatcher) {
    super(dispatcher);
    this.data = undefined;
    this.dataWithNoShowSlots = undefined;
  }

  handleApiOk() {
    this.data = JSON.parse(JSON.stringify(GridData));
    this.dataWithNoShowSlots = JSON.parse(
      JSON.stringify(GridDataWithNoShowSlots)
    );
    this.emitChange();
  }

  getData() {
    return this.data;
  }

  getDataWithNoShowSlots() {
    return this.dataWithNoShowSlots;
  }

  dehydrate() {
    return {
      data: this.data,
      dataWithNoShowSlots: this.dataWithNoShowSlots,
    };
  }

  rehydrate(state) {
    this.data = state.data;
    this.dataWithNoShowSlots = state.dataWithNoShowSlots;
  }
}

export default GridStore;
