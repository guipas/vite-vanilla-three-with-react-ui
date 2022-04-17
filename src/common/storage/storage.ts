import { autorun, toJS } from "mobx";
import store from "../store";
import _ from 'lodash';


export const save = _.debounce((data: any) => {
  console.log('saving', data);

  localStorage.setItem('faerie_city_data', JSON.stringify(data));
}, 2000);



// autorun(() => {
//   console.log('autorun', store, store.availableColors);
//   const data = toJS(store);
//   save(toJS(_.pick(
//     data,
//     ['availableColors', 'color']
//   )));
// });

