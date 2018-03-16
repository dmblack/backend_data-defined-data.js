let crypto = require('crypto');

let password = (state) => ({
  state: {
    hash: null,
    isHashed: false,
    iterations: 10000,
    password: null,
    salt: null,
    saltLength: 16
  },
  hash: function (newPassword) {
    if (this.password.hash !== null) {
      if (this.password.salt === null) {
        this.password.salt = crypto.crypto.randomBytes(128).toString('base64');
      }
    } else {
      return this;
    }

    this.password.hash = crypto.pbkdf2(newPassword, this.password.salt, this.password.iterations, 64, 'sha512'); /** Hashing algorithm sha512 */

    return this;
  },
  compare: function (comparePassword = this.state.password) {
    let _this = this;
    return new Promise(function (resolve, reject) {
      crypto.pbkdf2(comparePassword, _this.state.salt, _this.state.iterations, 64, 'sha512', (err, result) => {
        if (err) { reject(false) }
        resolve(_this.state.hash === result.toString('hex'));
      })
    })
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