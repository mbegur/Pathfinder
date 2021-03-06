/* global createjs */

class Path {
  constructor(path, stage) {
    this.stage = stage;
    this.processStringPath(path);
  }

  processStringPath(stringPath) {
    this.path = new createjs.Shape();
    this.path.graphics.setStrokeStyle(1).beginStroke('#00FFFF');

    stringPath.forEach(
      function(strCoords) {
        let [x,y] = strCoords.split(',').map(s => parseInt(s));
        x += 7.5; y += 7.5;
        this.path.graphics.lineTo(x, y);
      }.bind(this)
    );
    this.path.graphics.endStroke();
    this.stage.addChild(this.path);
  }

  reset() {
    this.stage.removeChild(this.path);
  }
}

export default Path;
