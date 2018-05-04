/**
 * Enables state tracking of this object.
 *  {array} stateable.history stores historical changes.
 * @param {any} state 
 */
const stateable = (state) => (Object.assign({}, {
  /**
   * Get current property value
   * @param {string} property 
   * @returns {any} Value of property.
   */
  get: function get (property) {
    return typeof property === 'undefined' ? { dataObject: state } : state[property];
  },

  /**
   * Will flush the current history.
   *  Current state will remain unchanged.
   * @returns {object} State.
   */
  flush: function flush () {
    statable.history = [];
    return state;
  },

  /**
   * Will reset state to original (history[0]), or to history location.
   * @param {number} history 
   * @returns {object} state.
   */
  reset: function reset (history) {
    if (typeof history === 'undefined') {
      return Object.assign({}, state, stateable.history[0]);
    } else {
      return Object.assign({}, state, stateable.history[parseInt(history)]);
    }
  },
  /**
   * Set property to value
   *  Additionally; saves original state before changes to history.
   * @param {string} property 
   * @param {any} value 
   * @returns {object} newly defined value.
   */
  set: function set (property, value) {
    stateable.history.push(state);

    state[property] = value;
    return state;
  }
}));

module.exports = stateable;

export default stateable;
