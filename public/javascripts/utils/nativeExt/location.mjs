import _ from 'underscore';
import qs from 'qs';

_.defaults(location, {
  get 'queryString'(){
    const queryString = location.search.substring(1);
    const queryParams = qs.parse(queryString);
    return queryParams;
  },
  resolve(pathname){
    const offset = /^\//.test(pathname) ? 0 : 1;
    const dirName = location.pathname.substring(0, location.pathname.lastIndexOf('/') + offset);
    return `${location.origin}${dirName}${pathname}`;
  }
});
