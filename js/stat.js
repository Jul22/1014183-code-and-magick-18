'use strict';

(function () {
  var CLOUD_WIDTH = 420; // window's width
  var CLOUD_HEIGHT = 270; // window's height
  var CLOUD_X = 100; // x coordinate
  var CLOUD_Y = 10;// y coordinate
  var GAP = 10;
  var BAR_WIDTH = 40; // bar's width
  var BAR_HEIGHT = 150; // bar's height
  var BAR_GAP = 50;// destination between bars


  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#000');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
    ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

    var maxTime = window.util.getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      ctx.fillStyle = '#000';
      ctx.fillText(names[i], CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 2);
      ctx.fillText(Math.round(times[i]), CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 5 - (BAR_HEIGHT * times[i]) / maxTime);
      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
      }

      ctx.fillRect(CLOUD_X + GAP * 3 + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP * 3 - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    }
  };
})();
