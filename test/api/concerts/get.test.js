const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');
const Seat = require('../../../models/seat.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcert = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'Performer #1', genre: 'Genre #1', price: 10, day: 1, image: 'Image #1' });
    await testConcert.save();

    const testSeat1 = new Seat({ _id: '5d9f1140f10a81226cfd4408', day: 1, seat: 1, client: 'Client #1', email: 'Email #1' });
    await testSeat1.save();

    const testSeat2 = new Seat({ _id: '5d9f1140f10a81316cfd4408', day: 1, seat: 2, client: 'Client #2', email: 'Email #1' });
    await testSeat2.save();
  });

  after(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  });

  it('/ should return concerts with seats', async () => {

    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
    expect(res.body[0]["tickets"]).to.be.equal(48);

  });

});
