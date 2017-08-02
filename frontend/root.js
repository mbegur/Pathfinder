import Grid from './grid';
import aStar from './algorithms/a_star';

window.aStar = aStar;

class View {
  constructor(stage) {
    this.board = new Grid(stage);
    this.board.init();
    this.aStar = new aStar(this.board);
    this.addListeners();

    this.resetDimensions();
  }

  addListeners() {
    window.addEventListener('resize', this.resetDimensions.bind(this));

    $('#algo-controls input').on('change', () => {
      const algoName = $('input[name=algo]:checked', '#algo-controls').val();
      this.aStar.kill();
      this.board.clearSearch();
    });
    $('#start-search').on('click', (e) => {
      e.preventDefault();
      this.finder.run();
    });
    // $('#clear-search').on('click', (e) => {
    //   e.preventDefault();
    //   this.finder.kill();
    //   this.board.clearSearch();
    // });
    // $('#set-obs').on('click', (e) => {
    //   e.preventDefault();
    //   const preset = $('input[name=preset]:checked', '#obs-controls').val();
    //   this.finder.kill();
    //   this.board.clearSearch();
    //   if(preset === 'simple') {
    //     this.board.setupSimple();
    //   } else if (preset === 'maze') {
    //     this.board.setupMaze();
    //   }
    // });
    // $('#clear-obs').on('click', (e) => {
    //   e.preventDefault();
    //   this.board.clearObstacles();
    // });
  }

  resetDimensions() {
    $('#main-canvas').width(window.innerWidth);
    $('#main-canvas').height(window.innerHeight);
    this.board.resetDimensions();
  }


}

export default View;
