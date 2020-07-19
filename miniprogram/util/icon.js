import {random} from "./util";

export default class Icon{
    constructor({ctx, swidth, sheight, src, width, height}){
        this.ctx = ctx;
        this.shw = swidth/2;
        this.shh = sheight/2;
        this.step = 40;
        this.setIcon({src, width, height})
        this.reinit();
    }

    setIcon({src, width, height}){
        this.src = src;
        this.rate = width/height;
    }

    reinit(){
        this.maxHeight = random(30, 60);
        this.maxWidth = this.rate * this.maxHeight; 
        this.width = 0;
        this.height = 0;
        this.pw = this.maxWidth / this.step;
        this.ph = this.maxHeight / this.step;

        let x = random(-50, 50), y = random(-50, 50);
        let rx = x>=0 ? 1:-1, ry = y>=0 ? 1:-1;
        this.startX = x + this.shw;
        this.startY = y + this.shh;
        this.endX = random(50, this.shw - this.maxWidth/2) * rx + this.shw;
        this.endY = random(50, this.shh - this.maxHeight/2) * ry + this.shh;
        this.px = (this.endX - this.startX) / this.step;
        this.py = (this.endY - this.startY) / this.step;
        this.x = this.startX;
        this.y = this.startY;

    }

    move(){
        if(this.width > this.maxWidth){
            return;
        }
        this.x+=this.px;
        this.y+=this.py;
        this.width+=this.pw;
        this.height+=this.ph;
    }

    draw(){
        this.ctx.drawImage(this.src, this.x - this.width/2, this.y - this.height/2, this.width, this.height);
    }
}