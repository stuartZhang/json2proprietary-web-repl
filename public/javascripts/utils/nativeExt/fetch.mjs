import _ from 'underscore';

const _fetch = fetch;
__context.fetch = (...args) => {
  let url;
  if (_.isString(args[0])) {
    url = args[0];
  } else if (args[0]) {
    url = args[0].url;
  }
  return _fetch(...args).then(res => {
    _.defaults(res, {url});
    if (!res.ok || res.status === 204) {
      throw fetch.createFetchError(res);
    }
    return res;
  });
};
_.extendOwn(fetch, {
  createFetchError(res){
    let message;
    if (_.isString(res)) {
      message = res;
    } else {
      message = `[${res.status}] ${res.statusText} - ${res.url}`;
    }
    const name = 'FetchError';
    const status = res.status;
    return Object.create(new Error(message), Object.defineDescriptors({message, name, status}));
  },
  isFetchError(obj, status){
    const cond1 = _.isError(obj) && obj.name === 'FetchError';
    const cond2 = _.isObject(obj) && obj.name === 'FetchError' && obj.message != null && obj.stack != null;
    const cond3 = status === undefined ? true : obj && obj.status === status;
    return (cond1 || cond2) && cond3;
  }
});
