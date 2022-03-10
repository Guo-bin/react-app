export const actionLog = (store) => (next) => (action) => {
    console.log("state 更改前", store.getState());
    console.log("action類型:", action);
    next(action);
    console.log("state更改後", store.getState());
};
