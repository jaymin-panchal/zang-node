'use strict';
const utils = require('./enum-utils');

/**
 * @module zang-node/enums/availablenumbertype
 */

/**
 * @readonly
 * @enum {string}
 */
const AvailableNumberType = {
    LOCAL: 'Local',
    TOLLFREE: 'Tollfree'
};

const reverseMap = utils.reverseMap(AvailableNumberType);

AvailableNumberType.forValue = function(value) {
    return reverseMap[value];
};

module.exports = AvailableNumberType;