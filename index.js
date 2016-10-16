'use strict';
const Hapi = require('hapi');
const Joi = require('joi');
const server = new Hapi.Server();
server.connection({ port: 3000 });

let products = [];
let id = 1;
server.route([
    {
        path: '/products',
        method: 'GET',
        handler: (req, reply) => {
            reply(products);
        }
    },
    {
        path: '/products',
        method: 'POST',
        config: {
            handler: (req, reply) => {
                try {
                    let product = req.payload;
                    product.id = id;
                    
                    products.push(product);
                    reply(true);
                }
                catch (e) {
                    console.log('error', e );
                    reply(false);

                }
            },
            validate: {
                payload: {
                    name: Joi.string().required(),
                    price: Joi.number().required()

                }
            }
        }
    },
    {
        path: '/products/{id}',
        method: 'DELETE',
        config: {
            handler: (req, reply) => {
                try {
                    let id = parseInt(req.params.id);
                    var list = products.filter(item => item.id == id);
                    if (list.length === 0) throw new Error('Item nao encontrado na lista');
                    products.pop(list[0]);
                    reply(true);
                }
                catch (e) {
                    console.log('error', e);
                    reply(false);
                }
            },
            validate: {
                params: {
                    id: Joi.number().required()
                }

            }
        }
    },
    {
        path: '/products/{id}',
        method: 'PUT',
        config: {
            handler: (req, reply) => {
                try {
                    const id = req.params.id;
                    const item = req.payload;
                    var list = products.filter(item => item.id == id);
                    if (list.length === 0) throw new Error("Item nao encontrado");
                    var index = products.indexOf(list[0]);
                    products[index] = item;
                    reply(true);

                }
                catch (e) {
                    console.log('error', e);
                    reply(false);
                }
            },
            validate: {
                params: {
                    id: Joi.number().required()
                },
                payload: {

                    name: Joi.string().required(),
                    price: Joi.number().required()

                }
            }
        }
    }
]);

server.start(() => {
    console.log('application is running');
});

module.exports = server;