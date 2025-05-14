#!/usr/bin/env node

const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        const queue = "Hello"

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, function(message) {
            console.log(`Received ${message.content.toString()}`);
        }, {
            noAck: true
        });
    });
});