let bcrypt = require('bcrypt');

let password = (state) => ({
  state: {
    error: null,
    errorState: false,
    hash: null,
    iterations: 10,
    password: null,
    salt: null
  },
  compare: function (comparePassword = this.state.password, hash = this.state.hash) {
    let _this = this;
    return new Promise(function (resolve, reject) {
      bcrypt.compare(comparePassword, hash, (err, result) => {
        if (err) { reject(false) }
        result === true ? resolve(true) : reject(false);
      })
    })
  },
  hash: function (target = this.state.password, salt = this.state.salt, iterations = this.state.iterations) {
    if (target === null) {
      this.state.errorState = true;
      this.state.error = 'Target value is "null".';
      return this;
    }
    if (salt === null) {
      bcrypt.genSalt(this.state.iterations, (err, salt) => {
        if (err) {
          this.state.errorState = true;
          this.state.error = err;
          return this;
        }

        this.state.salt = salt;
      })
    }

    bcrypt.hash(this.state.password, this.state.salt, (err, hash) => {
      this.state.errorState = false;
      this.state.hash = hash;
    });

    return this;
  },
  get: function (property) {
    return typeof this.state[property] === 'undefined' ? undefined : this.state[property];
  },
  set: function (property, value) {
    this.state[property] = value;
    return Object.assign({}, this);
  }
});

module.exports = (state) => { return Object.assign({}, password(state)) }
