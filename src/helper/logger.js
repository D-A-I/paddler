/* eslint-disable @typescript-eslint/no-var-requires */
/* I/Oや日付関連 */
const fs = require('fs'); // ファイルIO
// @ts-ignore
const moment = require('moment'); // 日付操作
const { promisify } = require('util');

// promise化
const mkdir = promisify(fs.mkdir);
const appendFile = promisify(fs.appendFile);

/**
 * ログ出力
 * @param {string} prefix
 * @param {string} message
 * @description `app.log`または`<プリフィックス>_<YYYYMMDD>.log`の形式でログ出力する
 */
module.exports = (prefix, message) => {
  let fileName = prefix
    ? `${prefix}_${moment().format('YYYYMMDD')}.log`
    : 'app.log';
  let appendLog = () =>
    appendFile(
      `./logs/${fileName}`,
      moment().format('YYYY/MM/DD HH:mm:ss') + ' ' + message + '\n'
    );
  // （node.jsの流儀に従い）フォルダの存在チェックはしない
  mkdir('./logs/')
    .then(
      // 初回のみ、mkdirはfulfilledになる
      () => appendLog(),
      err => {
        // 既にフォルダが存在する場合（2回目以降）
        if (err && err.code === 'EEXIST') appendLog();
      }
    )
    .catch(err => {
      if (err) console.log(err);
    });
};
