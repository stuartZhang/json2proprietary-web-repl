const _ = require('underscore');
const os = require('os');
const debug = require('debug');

_.extendOwn(exports, {
  render(layout, args){
    return (req, res) => {
      res.render(layout, args);
    };
  },
  safe(func){
    return async (req, res, next) => {
      try {
        await func(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  },
  getLocalIps(){
    const log = debug('json2proprietary-web-repl:Local-IP');
    const ips = [];
    for (const [ifname, ifaces] of Object.entries(os.networkInterfaces())) {
      let alias = 0;
      for (const iface of ifaces) {
        if ('IPv4' !== iface.family || iface.internal !== false) { // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          continue;
        }
        ips.push(iface.address);
        if (alias >= 1) { // this single interface has multiple ipv4 addresses
          log(`${ifname}:${alias} ${iface.address}`);
        } else { // this interface has only one ipv4 adress
          log(`${ifname} ${iface.address}`);
        }
        ++alias;
      }
    }
    return ips.filter(ip => _.isString(ip) && !_.isEmpty(ip));
  }
});
