'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bloom = function () {
	function Bloom() {
		_classCallCheck(this, Bloom);

		this.renderer = PIXI.autoDetectRenderer(800, 600, { transparent: true, resolution: 2 });
		this.stage = new PIXI.Container();

		this.flower = new Flower();
		this.flower.position.x = 200;
		this.flower.position.y = 600;
		this.stage.addChild(this.flower);

		this.grass = new PIXI.extras.TilingSprite(PIXI.Texture.fromImage('images/grass_texture.png'), this.renderer.width, 200);

		this.stage.addChild(this.grass);

		this.renderer.autoResize = true;
		document.body.appendChild(this.renderer.view);
		this.update();
	}

	_createClass(Bloom, [{
		key: 'update',
		value: function update() {
			var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			this.renderer.resize(viewportWidth, viewportHeight);
			this.flower.position.x = viewportWidth / 2;
			this.flower.position.y = viewportHeight;
			this.flower.update();
			this.grass.y = viewportHeight - 200;
			this.renderer.render(this.stage);
			window.requestAnimationFrame(this.update.bind(this));
		}
	}]);

	return Bloom;
}();

new Bloom();