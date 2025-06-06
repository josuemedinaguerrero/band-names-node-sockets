import Band from '../models/band.js';
import Bands from '../models/bands.js';

export default (io) => {
  const bands = new Bands();
  bands.addBand(new Band('Metalica'));
  bands.addBand(new Band('Bon Jou'));
  bands.addBand(new Band('Héroes del silencio'));
  bands.addBand(new Band('ROCKEE'));

  // Mensajería por sockets
  io.on('connection', (client) => {
    console.log({ CLIENTE_CONECTADO: client.id });

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', (client) => {
      console.log('Cliente se ha desconectado');
    });

    client.on('vote-band', (payload) => {
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
      bands.addBand(new Band(payload.name));
      io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
      bands.deleteBand(payload.id);
      io.emit('active-bands', bands.getBands());
    });
  });

  io.on('connection_error', (err) => {
    console.log('Error de conexión:', err);
  });
};
