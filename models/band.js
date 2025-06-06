import { v4 as uuidV4 } from 'uuid';

class Band {
  constructor(name = '') {
    this.id = uuidV4();
    this.name = name;
    this.votes = 0;
  }
}

export default Band;
