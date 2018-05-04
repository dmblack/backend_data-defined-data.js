/**
 * Prepares Attribute Interface
 * 
 * @param {any} model knex model
 */
/**
 * Returns Model Interface
 * 
 * @param {any} state initial state
 */
const attribute = (state) => ({
  attribute: () => {
    return Object.assign({}, state, state.models.attribute.describe());
  },
  /**
   * get
   * 
   * @param {any} key of desired value (eg; last_updated)
   * @returns {mixed} value
   */
  get: (key) => {
    return typeof key === 'undefined'
      ? state
      : typeof key === 'string'
        ? state[key] || undefined
        : undefined;
  },
  /**
   * set
   * 
   * @param {object} keyValuePair object of value to update (Eg; { 'key': 'value' })
   */
  set: (keyValuePair) => {
    /**
     * ToDo:
     * 
     * Handle Attribute History or invoke otherwise.
     * Perhaps we will build this into a behavior prior to calling attribute behavior.
     */
    this.state[keyValuePair.key(0)] = keyValuePair[keyValuePair.key(0)]
  }
});

module.exports = attribute;
