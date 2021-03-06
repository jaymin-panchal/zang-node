'use strict';

/**
 * @module zang-node/inboundxml
 */


const xml = require('xml');
const conference = require('./conference');
const dial = require('./dial');
const gather = require('./gather');
const getspeech = require('./getspeech');
const hangup = require('./hangup');
const mms = require('./mms');
const number = require('./number');
const pause = require('./pause');
const ping = require('./ping');
const play = require('./play');
const playlastrecording = require('./playlastrecording');
const record = require('./record');
const redirect = require('./redirect');
const reject = require('./reject');
const response = require('./response');
const say = require('./say');
const sip = require('./sip');
const sms = require('./sms');
const user = require('./user');


let schema = null;
let xsd = null;
try {
    xsd = require('libxml-xsd');
} catch (e) {
    console.log('Warning: XSD validation library not installed (libxml-xsd). Skipping validation.')
}

function loadSchema() {
    return new Promise((resolve, reject) => {
        if (!xsd || schema) {
            return resolve(true);
        }
        xsd.parseFile(__dirname + '/inboundxml.xsd', function(err, loadedSchema){
            if (err) return reject(err);
            schema = loadedSchema;
            return resolve(schema);
        });
    });
}

module.exports = {
    /**
     * Creates XML from XML definition
     * @param {Object} xmlDefinition
     * @returns {Object}
     */
    build: function (xmlDefinition) {
        const createdXml = xml(xmlDefinition, {indent: '  ', declaration: true});
        return loadSchema().then(function(){
            if (!schema) return createdXml;
            const validationErrors = schema.validate(createdXml);
            if (validationErrors) {
                throw validationErrors.join(', ');
            } else {
                return createdXml;
            }
        });

    },
    /**
     * Creates Conference XML node
     * @see module:zang-node/inboundxml/conference
     */
    conference,
    /**
     * Creates Dial XML node
     * @see module:zang-node/inboundxml/dial
     */
    dial,
    /**
     * Creates Gather XML node
     * @see module:zang-node/inboundxml/gather
     */
    gather,
    /**
     * Creates Gather XML node
     * @see module:zang-node/inboundxml/gather
     */
    getspeech,
    /**
     * Creates Hangup XML node
     * @see module:zang-node/inboundxml/hangup
     */
    hangup,
    /**
     * Creates Mms XML node
     * @see module:zang-node/inboundxml/mms
     */
    mms,
    /**
     * Creates Number XML node
     * @see module:zang-node/inboundxml/number
     */
    number,
    /**
     * Creates Pause XML node
     * @see module:zang-node/inboundxml/pause
     */
    pause,
    /**
     * Creates Ping XML node
     * @see module:zang-node/inboundxml/ping
     */
    ping,
    /**
     * Creates Play XML node
     * @see module:zang-node/inboundxml/play
     */
    play,
    /**
     * Creates PlayLastRecording XML node
     * @see module:zang-node/inboundxml/playlastrecording
     */
    playlastrecording,
    /**
     * Creates Record XML node
     * @see module:zang-node/inboundxml/record
     */
    record,
    /**
     * Creates Redirect XML node
     * @see module:zang-node/inboundxml/redirect
     */
    redirect,
    /**
     * Creates Reject XML node
     * @see module:zang-node/inboundxml/reject
     */
    reject,
    /**
     * Creates Response XML node
     * @see module:zang-node/inboundxml/response
     */
    response,
    /**
     * Creates Say XML node
     * @see module:zang-node/inboundxml/say
     */
    say,
    /**
     * Creates Sip XML node
     * @see module:zang-node/inboundxml/sip
     */
    sip,
    /**
     * Creates Sms XML node
     * @see module:zang-node/inboundxml/sms
     */
    sms,
    /**
     * Creates User XML node
     * @see module:zang-node/inboundxml/user
     */
    user
};
