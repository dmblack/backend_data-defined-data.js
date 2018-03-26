const attribute = (model) => (state) => ({
  attribute: () => {
    return state.models.attribute.describe();
  },
  get: () => {
    return state;
  },
  set: (value) => {
    /**
     * ToDo:
     * 
     * Handle Attribute History or invoke otherwise.
     * Perhaps we will build this into a behavior prior to calling attribute behavior.
     */
    state.value = value;
  }
});

module.exports = attribute;
