#!/usr/bin/env node

const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if(error1) {
            throw error1;
        }
        const queue = "Hello"
        const message = "Hello world"



        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(message))
        console.log(`${message} was send to queue ${queue} with succefull`)


        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg){
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});