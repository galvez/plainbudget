import _, { Store } from 'vuex' // eslint-disable-line

Store.prototype.hasActionHandler = function (actionHandler) {
  return actionHandler in this._actions
}

Store.prototype.api = function (apiMethod, payload) {
  return this.dispatch('api', { apiMethod, payload }, { root: true })
}
