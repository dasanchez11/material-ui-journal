import { injectAsyncReducer } from "../common/store/inject-async.reducer";

export default (store: any) => {
  const modules: any = {};

  return (name: string, moduleProvider: any) => {
    if (modules.hasOwnProperty(name)) {
      return Promise.resolve(modules[name]);
    } else {
      return moduleProvider.then((mod: any) => {
        modules[name] = mod;
        injectAsyncReducer(store, name, mod.reducer);
        return mod;
      });
    }
  };
};
