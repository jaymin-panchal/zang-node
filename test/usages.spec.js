'use strict';
const expectation = require('./expectation');
const Product = require('../enums/products');
const connectors = require('../connectors');

const usagesConnector = new connectors.Factory({
    accountSid: 'TestAccountSid',
    authToken: 'TestToken'
}).usages;

describe('UsagesTest', function () {
    beforeEach(function () {
        expectation.create(this.currentTest.parent);
    });

    describe('listUsages', function () {
        it('should return a list of usages', function () {
            return usagesConnector.listUsages({
                year: 2016,
                month: 12,
                day: 12,
                product: Product.OUTBOUND_SMS,
                page: 0,
                pageSize: 25
            }).then(data => {
                console.log(data);
                return data;
            });
        })
    });

    describe('viewUsage', function () {
        it('should return a usage', function () {
            return usagesConnector.viewUsage({
                usageSid: 'TestUsageSid'
            }).then(data => {
                console.log(data);
                return data;
            });
        })
    });
});



