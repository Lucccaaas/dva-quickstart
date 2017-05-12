/**
 * Created by yunge on 16/11/15.
 */


function getValueOrElse (object, key, elseValue) {
    return (object || {})[key] || elseValue;
}


export default {
    getValueOrElse
}
