import { action, observable } from "mobx";
import { load } from "./storage/load";


const saved = load();

export const store = observable({
  ...saved,
})

export default store;

export const rotateCamera = action((way: number = 1) => {
  store.camera.rotation += way;
})

export const resetCamera = action(() => {
  store.camera.rotation = 0;
});