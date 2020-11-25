const knex = require('knex')
const app = require('../src/app');
const { makeItemsArray, makeMaliciousUser } = require('./items.fixtures')

describe(`Items API Endpoints`, () => {
    let db;

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    });
    before('cleanup', () => db.raw('TRUNCATE TABLE items RESTART IDENTITY;'));

    afterEach('cleanup', () => db.raw('TRUNCATE TABLE items RESTART IDENTITY;'));

    after('disconnect from the database', () => db.destroy());

    describe('GET /api/items', () => {

        context(`Given there are items in the db`, () => {
        
            const testItems = makeItemsArray();
            
            beforeEach('insert items into db', () => {
                return db
                .into('items')
                .insert(testItems)
            })
            
            it('responds with 200 and all of the items', function () {
                return supertest(app)
                .get('/api/items')
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`) 
                .expect(200)
                .expect(res => {
                    expect(res.body.id).to.eql(testItems.id)
                    expect(res.body.username).to.eql(testItems.username)
                })
            });
            
        });

        context('Given an XSS attack user', () => {
            const testItems = makeItemsArray();
            const { maliciousUser, expectedUser} = makeMaliciousUser();

            beforeEach('insert malicious user into db', () => {
                return db  
                    .into('items')
                    .insert(maliciousUser)
            });
                
            it(`removes XSS attack content`, () => {
                return supertest(app)
                    .get(`/api/items/${maliciousUser.id}`)
                    .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                    .expect(200)
                    .expect(res => {
                        expect(res.body.username).to.eql(expectedUser.username)
                        expect(res.body.password).to.eql(expectedUser.password)
                        expect(res.body.email).to.eql(expectedUser.email)
                    })
            });
        
        });
   
    });

    describe(`POST /api/items`, () => {

        it(`creates a user, responding with 204`, function () {
            const newUser = {
                username: 'Test new user', 
                password: 'aaAA11!!',

            };
            return supertest(app)
                .post(`/api/items/`)
                .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
                .send(newUser)
                .expect(204)
        });
    
    });

});