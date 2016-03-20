'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Petal = function (_PIXI$Sprite) {
	_inherits(Petal, _PIXI$Sprite);

	function Petal() {
		_classCallCheck(this, Petal);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Petal).call(this));

		var texture = PIXI.Texture.fromImage('images/petal.png');
		_this.petalImage = new PIXI.Sprite(texture);
		_this.petalImage.anchor.y = .5;
		_this.addChild(_this.petalImage);
		_this.angle = 0;
		_this.rotate = 6;
		_this.speedModifier = (Math.floor(Math.random() * 8) + 1) / 100;
		_this.buttonMode = true;
		_this.interactive = true;
		_this.plucked = false;

		_this.click = _this.tap = _this.onPluck;
		return _this;
	}

	_createClass(Petal, [{
		key: 'onPluck',
		value: function onPluck() {
			this.plucked = true;
			this.buttonMode = this.interactive = false;
		}
	}, {
		key: 'update',
		value: function update() {
			if (!this.plucked) {
				if (this.petalImage.x > 0) this.petalImage.x = 0;
				if (this.petalImage.alpha < 1) {
					this.petalImage.alpha += .1;
				}
				this.petalImage.rotation = Math.sin(this.angle) * (this.rotate * (Math.PI / 180));
				this.angle += this.speedModifier;
			} else {
				if (this.petalImage.x < 100) {
					this.petalImage.x += 4;
				}
				if (this.petalImage.alpha > 0) {
					this.petalImage.alpha -= .1;
				}
			}
		}
	}]);

	return Petal;
}(PIXI.Sprite);

var Head = function (_PIXI$Sprite2) {
	_inherits(Head, _PIXI$Sprite2);

	function Head() {
		_classCallCheck(this, Head);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Head).call(this));

		_this2.numPetals = 20;
		_this2.petals = [];
		_this2.generatePetals();
		return _this2;
	}

	_createClass(Head, [{
		key: 'generatePetals',
		value: function generatePetals() {
			this.removeChildren();
			for (var a = 0; a < this.numPetals; a++) {
				var petal = new Petal();
				petal.rotation = a * 30;
				this.petals.push(petal);
				this.addChildAt(petal, 0);
			}
		}
	}, {
		key: 'update',
		value: function update() {
			var allplucked = true;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.petals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var petal = _step.value;

					petal.update();
					if (!petal.plucked) {
						allplucked = false;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (allplucked) {
				this.generatePetals();
			}
		}
	}]);

	return Head;
}(PIXI.Sprite);

var Stem = function (_PIXI$Sprite3) {
	_inherits(Stem, _PIXI$Sprite3);

	function Stem() {
		_classCallCheck(this, Stem);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Stem).call(this, PIXI.Texture.fromImage('images/stem.png')));

		_this3.anchor.x = .5;
		_this3.anchor.y = 1;
		_this3.angle = 0;
		_this3.rotate = 6;
		return _this3;
	}

	_createClass(Stem, [{
		key: 'update',
		value: function update() {
			this.rotation = Math.sin(this.angle) * (this.rotate * (Math.PI / 180));
			this.angle += .01;
		}
	}]);

	return Stem;
}(PIXI.Sprite);

var Flower = function (_PIXI$Sprite4) {
	_inherits(Flower, _PIXI$Sprite4);

	function Flower() {
		_classCallCheck(this, Flower);

		var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Flower).call(this));

		_this4.head = new Head();
		_this4.stem = new Stem();

		_this4.addChild(_this4.stem);
		_this4.addChild(_this4.head);

		_this4.scale.x = _this4.scale.y = .5;
		return _this4;
	}

	_createClass(Flower, [{
		key: 'update',
		value: function update() {
			this.head.update();
			this.stem.update();
			var stemHeight = this.stem.height - 30;
			this.head.x = this.stem.x + Math.sin(this.stem.rotation) * stemHeight;
			this.head.y = -(this.stem.y + Math.cos(this.stem.rotation) * stemHeight);
			//this.head.y = -this.stem.height;
		}
	}]);

	return Flower;
}(PIXI.Sprite);