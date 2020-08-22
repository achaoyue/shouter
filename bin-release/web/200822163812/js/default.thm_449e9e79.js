
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"MainGame":"resource/eui_skins/MainGame.exml","DaYan":"resource/eui_skins/DaYan.exml"};generateEUI.paths['resource/eui_skins/DaYan.exml'] = window.DaYanSkin = (function (_super) {
	__extends(DaYanSkin, _super);
	function DaYanSkin() {
		_super.call(this);
		this.skinParts = ["pic","scoreLabel"];
		
		this.height = 140;
		this.width = 140;
		this.elementsContent = [this._Rect1_i(),this.pic_i(),this.scoreLabel_i()];
	}
	var _proto = DaYanSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0x2d0808;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.pic_i = function () {
		var t = new eui.Image();
		this.pic = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 140;
		t.source = "egret_icon_png";
		t.width = 140;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.scoreLabel_i = function () {
		var t = new eui.Label();
		this.scoreLabel = t;
		t.text = "0";
		t.textColor = 0xef2323;
		t.x = 123;
		t.y = 0;
		return t;
	};
	return DaYanSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/MainGame.exml'] = window.MainGameSkin = (function (_super) {
	__extends(MainGameSkin, _super);
	function MainGameSkin() {
		_super.call(this);
		this.skinParts = ["arrow","arrow_1","score","resultLabel","aginBtn"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.arrow_i(),this.arrow_1_i(),this.score_i(),this.resultLabel_i(),this.aginBtn_i()];
	}
	var _proto = MainGameSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "bg_jpg";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.arrow_i = function () {
		var t = new eui.Image();
		this.arrow = t;
		t.anchorOffsetX = 118;
		t.anchorOffsetY = 115;
		t.height = 162;
		t.rotation = 45;
		t.source = "arrow_png";
		t.width = 162;
		t.x = 322;
		t.y = 1051;
		return t;
	};
	_proto.arrow_1_i = function () {
		var t = new eui.Image();
		this.arrow_1 = t;
		t.anchorOffsetX = 21.13;
		t.anchorOffsetY = 19.54;
		t.height = 162;
		t.rotation = 45;
		t.source = "arrow2_png";
		t.visible = false;
		t.width = 162;
		t.x = 322.12;
		t.y = 1072.65;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.horizontalCenter = 0;
		t.text = "0";
		t.textAlign = "center";
		t.y = 23;
		return t;
	};
	_proto.resultLabel_i = function () {
		var t = new eui.Label();
		this.resultLabel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.size = 60;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x166cf9;
		t.width = 638;
		t.x = 1.33;
		t.y = 478;
		return t;
	};
	_proto.aginBtn_i = function () {
		var t = new eui.Label();
		this.aginBtn = t;
		t.text = "再玩一次";
		t.textColor = 0x34464f;
		t.x = 259.88;
		t.y = 710;
		return t;
	};
	return MainGameSkin;
})(eui.Skin);