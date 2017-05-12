/**
 * Created by yunge on 16/10/27.
 */

import dva from 'dva';

export default {
   namespace: 'products',
   state: [],
   reducers: {
       'delete'(state, {payload: id}) {
          return state.filter(item => item.id !== id);
       }
   }
}
