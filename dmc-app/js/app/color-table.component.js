"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var color_service_1 = require('./color.service');
var ColorTableComponent = (function () {
    function ColorTableComponent(colorService) {
        this.colorService = colorService;
    }
    ColorTableComponent.prototype.ngOnInit = function () {
        console.log("Length of colors array: ");
        this.getColors();
    };
    ColorTableComponent.prototype.getColors = function () {
        var _this = this;
        this.colorService.matchColors(this.searchColor)
            .then(function (colors) { return _this.colors = colors; });
        console.log("Length of colors array: " + this.colors.length);
    };
    ColorTableComponent.prototype.setCellColor = function (color) {
        var bgcolor = { 'background-color': color.hex };
        return bgcolor;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ColorTableComponent.prototype, "searchColor", void 0);
    ColorTableComponent = __decorate([
        core_1.Component({
            selector: 'color-table',
            template: "\n  <table class=\"colors\">\n    <tr *ngFor=\"let color of colors; let first=first\">\n      <td *ngIf=\"first\"\n          rowspan=5, width=100px, height=75px, [ngStyle]=\"{'background-color': searchColor}\"></td>\n      <td width=75px, height=75px, [ngStyle]=setCellColor(color)></td>\n      <td>\n        <div>\n          <b>{{color.name}}</b></div>\n        <div>\n          <label>DMC </label>#{{color.id}}</div>\n        <div>\n          <label>HEX </label>{{color.hex}}</div>\n      </td>\n    </tr>\n  </table>\n  ",
            styles: ["\n  table { \n    font-family: Arial, Helvetica, sans-serif;\n    width: 100%;\n  }\n  "],
            providers: [color_service_1.ColorService]
        }), 
        __metadata('design:paramtypes', [color_service_1.ColorService])
    ], ColorTableComponent);
    return ColorTableComponent;
}());
exports.ColorTableComponent = ColorTableComponent; // ColorTableComponent
//# sourceMappingURL=color-table.component.js.map