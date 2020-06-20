const bcrypt = require('bcryptjs');

class HashHelper {
  /**
   * @description hash plain text
   *
   * @param {*} plainText
   */
  hash(plainText) {
    const hash = bcrypt.hashSync(plainText, bcrypt.genSaltSync(10));

    return hash;
  }

  /**
   * @description verify plain text against hash
   *
   * @param {*} plainText
   * @param {*} hash
   */
  async verifyHash(plainText, hash) {
    const isPlainTextEqualHash = await bcrypt.compare(plainText, hash);

    return isPlainTextEqualHash;
  }
}

module.exports = new HashHelper();
