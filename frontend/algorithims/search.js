import Path from '../line';

class Search {
  constructor(board) {
    this.board = board;
    this.reset();
  }

  initializeFrontier() {
    this.reset();
    this.processNeighbors(this.board.start);
  }

  reset() {
    if(this.path) this.path.reset();
    this.cameFrom = {};
    this.cameFrom[this.board.start] = null;
  }

  kill() {
    clearInterval(this.updateInterval);
    this.reset();
  }

  run() {
    this.initializeFrontier();

    this.updateInterval = setInterval(
      () => {
        const current = this.frontier.get();
        if(!current || current === this.board.goal) {
          clearInterval(this.updateInterval);
          this.path = new Path(this.buildPath(), this.board.stage);
        }

        this.processNeighbors(current);
        this.board.grid[current].setType('visited');
      }, 50);
  }

  oldRun() {
    this.initializeFrontier();

    while(!this.frontier.isEmpty()) {
      const current = this.frontier.get();
      if (current === this.board.goal) break;

      this.processNeighbors(current);
      this.board.grid[current].setType('visited');
    }

    return this.buildPath();
  }

  buildPath() {
    if(!this.cameFrom[this.board.goal]) {
      return null;
    }

    let current = this.board.goal;
    let path = [];

    while(current) {
      path.unshift(current);
      current = this.cameFrom[current];
    }

    return path;
  }

  heuristic(coords1, coords2) {
    const [x1, y1] = coords1.split(',').map(s => parseInt(s));
    const [x2, y2] = coords2.split(',').map(s => parseInt(s));

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

}

export default Search;
