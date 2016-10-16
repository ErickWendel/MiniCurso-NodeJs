'use strict';

const server = require('../index.js');
const request = require('hapi-test-request')(server);
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('CRUD', () => {

    before((done) => {
        request.call({
            method: 'POST',
            url: '/products',
            payload: {
                name: 'Churros',
                price: 13.5
            }
        }).then(response => {
            assert.equal(response.statusCode, 200);
        }).then(done).catch(done);
    });

    describe('#Cadastrar items', () => {
        it('deve cadastrar um item', (done) => {
            request.call({
                method: 'POST',
                url: '/products',
                payload: {
                    name: 'Cachorro Quente',
                    price: 5.5
                }
            }).then(response => {
                assert.equal(response.result, true);
            })
                .then(done)
                .catch(done);
        })
    });

    describe('#Listar items', () => {
        it('deve retornar uma lista com mais de um item', function (done) {
            request.call({
                method: 'GET',
                url: '/products'
            })
                .then((response) => {
                    expect(response.result).to.have.length.least(1);
                })
                .then(done)
                .catch(done);

        });
    });

    describe('#Remover item', () => {
        it('deve remover item pelo id', (done) => {
            request.call({
                method: 'DELETE',
                url: '/products/1',
            })
                .then((response) => {
                    assert.equal(response.result, true);
                })
                .then(done)
                .catch(done);
        });
    });

    describe('#Atualizar item', () => {
        it('deve atualizar item pelo id', (done) => {
            request.call({
                method: 'PUT',
                url: '/products/1',
                payload: {
                    'name': 'Paçoca',
                    'price': 0.20
                }
            })
                .then((response) => {
                    assert.equal(response.result, true);
                })
                .then(done)
                .catch(done);
        });
    });


});