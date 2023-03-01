
var _ = require('lodash');


module.exports = {
    /**
     * @returns {callback}
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getRequestLogger:function(options){

        return function (req, res, next) {
            // to ignore - req.url starting with /styles,/js,/semantic,/favicon.ico,/health
            var patt = new RegExp("^\/(dependencies|js|semantic|styles|favicon|health|css|min|fonts|image)");
            if (!patt.test(req.url)) {
                var log = {
                    app_env: process.env.NODE_ENV,
                    app_name: process.env.APP_NAME || 'unknown',
                    status: 'REQUESTED',
                    req_method: req.method,
                    req_url: req.url,
                    req_body: req.body ? _.cloneDeep(req.body) : {},
                    req_query: req.query ? req.query : {},
                    req_protocol: req.protocol,
                    req_host: req.hostname,
                    req_ip: req.ip,

                    req_headers: _.cloneDeep(req.headers),

                    req_route_path: (req.route) ? req.route.path : null,

                    // user info
                    req_user_id: (req.user) ? req.user.id : null,
                    req_user_username: (req.user) ? req.user.username : null,
                    // req_user_details: (req.user) ? req.user : null,
                    req_session_id: req.sessionID,
                };

                // remove sensitive information
                if (log.req_headers.authorization)
                    delete log.req_headers.authorization

                if (log.req_body.password)
                    delete log.req_body.password

                // if (log.req_body) log.req_body = JSON.stringify(log.req_body);

                req._sails.log.info(JSON.stringify(log));
                if(options.eventQueue)
                    options.eventQueue.add('serverlog',_.cloneDeep(log));

                res.on('finish', function () {
                    log.status = 'RESPONDED';
                    log.res_status_code = res.statusCode.toString();
                    log.res_status_message = res.statusMessage
                    log.res_time = (new Date()) - req._startTime;
                    log.res_meta = (res.meta) ? res.meta : {};
                    req._sails.log.info(JSON.stringify(log));
                    if(options.eventQueue)
                        options.eventQueue.add('serverlog',_.cloneDeep(log));
                });

                //To handle the timeout scenarios
                res.on('close', function () {
                    log.status = 'CLOSED';
                    log.res_status_code = res.statusCode.toString();
                    log.res_status_message = res.statusMessage
                    log.res_time = (new Date()) - req._startTime;
                    log.res_meta = (res.meta) ? res.meta : {};
                    log.res_finished = res.finished;
                    if(!res.finished){ // this is when the connection is closed by downstream such as user cancelling request or cloudflare closing the request. 
                        log.res_status_code='504';
                        log.res_status_message='Unfinished as closed by downstream';
                    }

                    req._sails.log.info(JSON.stringify(log));
                    if(options.eventQueue)
                        options.eventQueue.add('serverlog',_.cloneDeep(log));
                });
            }
            return next();
        }
    }
}