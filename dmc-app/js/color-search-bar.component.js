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
var ColorSearchBarComponent = (function () {
    function ColorSearchBarComponent() {
        this.invalidSearchTerm = false;
    }
    ColorSearchBarComponent.prototype.isValidColor = function (str) {
        return (str.search('^#?(?:[0-9a-fA-F]{3}){1,2}$') != -1);
    };
    ColorSearchBarComponent.prototype.checkAndUpdate = function () {
        if (this.searchColor && this.isValidColor(this.searchColor)) {
            this.invalidSearchTerm = false;
            if (this.searchColor.charAt(0) != '#')
                this.searchColor = '#' + this.searchColor;
            if (this.searchDepth <= 1)
                this.searchDepth = 1;
            this.updateTableFunction(this.searchColor, Math.round(this.searchDepth));
        }
        else
            this.invalidSearchTerm = true;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], ColorSearchBarComponent.prototype, "updateTableFunction", void 0);
    ColorSearchBarComponent = __decorate([
        core_1.Component({
            selector: 'color-search-bar',
            template: "\n    <div>\n      <input [(ngModel)]=\"searchColor\"  placeholder=\"color\"  width=200px\n             [ngStyle]=\"{'border-color': (!searchColor || isValidColor(searchColor)) ? '#dddddd' : '#ff8888'}\"/>\n      <input [(ngModel)]=\"searchDepth\"  placeholder=\"number\"  type=\"number\"  width=50px\n             [ngStyle]=\"{'border-color':'#dddddd'}\"/>\n      <button (click)=\"checkAndUpdate()\">Search</button>\n      <div *ngIf=\"invalidSearchTerm\"  style=\"color:red\">\n         Please enter a valid hexadecimal color.\n      </div>\n    </div>\n  ",
            styles: ["\n     input {\n       height: 30px;\n     }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], ColorSearchBarComponent);
    return ColorSearchBarComponent;
}());
exports.ColorSearchBarComponent = ColorSearchBarComponent; // ColorSearchBarComponent
//# sourceMappingURL=color-search-bar.component.js.map