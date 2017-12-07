const _ = require('underscore');
const cluster = require('cluster');
const os = require('os');
const debug = require('debug');
const {ArgumentParser} = require('argparse');
const pckg = require('../package.json');

_.extendOwn(exports, {
  render(layout, args){
    return (req, res) => {
      res.render(layout, args);
    };
  },
  safe(func){
    return async (req, res, next) => {
      try {
        return await func(req, res, next);
      } catch (err) {
        return next(err);
      }
    };
  },
  getLocalIps(){
    const log = exports.debug('Local-IP');
    const ips = [];
    for (const [ifname, ifaces] of Object.entries(os.networkInterfaces())) {
      let alias = 0;
      for (const iface of ifaces) {
        if (iface.family !== 'IPv4' || iface.internal !== false) { // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
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
  },
  getHostname(){
    if (process.env.USERDOMAIN) {
      return `${os.hostname()}.${process.env.USERDOMAIN}.com`.toLowerCase();
    }
    return os.hostname().toLowerCase();
  },
  debug(category){
    if (cluster.isWorker) {
      return debug(`${pckg.name}[${cluster.worker.process.pid}/${cluster.worker.id}]:${category}`);
    }
    return debug(`${pckg.name}:${category}`);
  },
  buildCliArgs(){
    const parser = new ArgumentParser({
      'version': '0.0.1',
      'addHelp': true,
      'description': 'Nav Web Server'
    });
    parser.addArgument(['-p', '--port'], {
      'action': 'store',
      'defaultValue': process.env.PORT || 3000,
      'dest': 'port',
      'help': 'The port number. (Default: 3000)',
      'type': 'int'
    });
    parser.addArgument(['-cn', '--cert-name'], {
      'action': 'store',
      'defaultValue': process.env.HTTPS_CERT_NAME,
      'dest': 'certName',
      'help': 'The certificate name',
      'type': 'string'
    });
    parser.addArgument(['-dbg', '--debug'], {
      'action': 'storeTrue',
      'defaultValue': process.env.NODE_ENV === 'development',
      'dest': 'isDebug',
      'help': 'Enable the debug mode. (Default: false)'
    });
    const cliArgs = parser.parseArgs();
    if (cliArgs.isDebug) {
      process.env.NODE_ENV = 'development';
    }
    return cliArgs;
  }
});
