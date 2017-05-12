/**
 * Created by yunge on 16/11/15.
 */

function notNull (rule, value, callback) {
    if (!value) {
        callback(new Error('不能为空'));
    }
    callback();
}


export default {
    notNull
}