import {random} from "./util";

let MAX_POOL_LENGTH = 100;

export let SINGLE_LENGTH = 15;

export let MAX_LENGTH = 50

let icon_pool = [];

let pool_index = 0;

let id = 1;

function getId(){
    if(id<15){
        id++;
    }else{
        id=1;
    }
    return id;
}

export function getIcon({ctx, icons, swidth, sheight, width, height, index}){
    if(icon_pool.length < MAX_POOL_LENGTH){
        let icon = new Icon({ctx, icons, swidth, sheight, width, height, index});
        icon_pool.push(icon)
        return icon;
    }else{
        let icon = icon_pool[pool_index];
        pool_index ++;
        if(pool_index>=100){
            pool_index = 0;
        }
        icon.reinit(index);
        return icon;
    }
    
}

class Icon{
    constructor({ctx, icons, swidth, sheight, width = 1, height = 1, index}){
        this.ctx = ctx;
        this.shw = swidth/2;
        this.shh = sheight/2;
        this.step = 40;
        this.icons = icons;
        this.setIcon({width, height})
        this.reinit(index);
    }

    setIcon({width, height}){
        this.rate = width/height;
    }

    reinit(index){
        this.index = index;
        this.id = getId();
        this.disabled = false;
        this.maxHeight = random(50, 80);
        this.maxWidth = this.rate * this.maxHeight; 
        this.width = 0;
        this.height = 0;
        this.pw = this.maxWidth / this.step;
        this.ph = this.maxHeight / this.step;
        let startArea = 20;
        // let x = random(-50, 50), y = random(-50, 50);
        let x = random(-startArea, startArea), y = random(-startArea, startArea);
        this.startX = x + this.shw;
        this.startY = y + this.shh;

        this.reinitEndPos()
        // let rx = x>=0 ? 1:-1, ry = y>=0 ? 1:-1;
        // this.endX = random(startArea, this.shw - this.maxWidth) * rx + this.shw;
        // this.endY = random(startArea, this.shh - this.maxHeight) * ry + this.shh;'

        this.px = (this.endX - this.startX) / this.step;
        this.py = (this.endY - this.startY) / this.step;
        this.x = this.startX;
        this.y = this.startY;

        this.startDeg = random(0, 90) * Math.PI / 180;
        this.endDeg = random(180, 360) * Math.PI / 180;
        this.pdeg = (this.endDeg - this.startDeg) / this.step;
        this.deg = this.startDeg;

        this.src = `../../images/icon_0${index%7+1}.png`;
    }

    reinitEndPos(){
        let pi = Math.PI / 180;
        let _deg = 360 / SINGLE_LENGTH;
        let deg = random(1, _deg) + this.id*_deg;
        let rate = random(3, 9) * 0.1;
        let x,y;
        if(deg<45){
            x = rate * this.shw;
            y = -(x * Math.atan(deg * pi));
        }else if(deg<90){
            y = - rate * this.shh;
            x = (-y) * Math.atan((90-deg) * pi);
        }else if(deg<135){
            y = - rate * this.shh;
            x = y * Math.atan((deg-90) * pi);
        }else if(deg<180){
            x = - rate * this.shw;
            y = x * Math.atan((180-deg) * pi);
        }else if(deg<225){
            x = - rate * this.shw;
            y = (-x) * Math.atan((deg-180) * pi);
        }else if(deg<270){
            y = rate * this.shh;
            x = (-y) * Math.atan((270-deg) * pi);
        }else if(deg<315){
            y = rate * this.shh;
            x = y * Math.atan((deg-270) * pi);
        }else{
            x = rate * this.shw;
            y = x * Math.atan((360-deg) * pi);
        }
        this.endX = this.shw + x;
        this.endY = this.shh + y;
    }

    disable(){
        this.disable = true;
    }
    move(){
        if(this.disabled){
            return;
        }
        if(this.width > this.maxWidth){
            if(!this.disabled){
                this.disabled = true;
                setTimeout(()=>{
                    this.icons.splice(this.icons.indexOf(this), 1);
                }, 200)
            }
            return;
        }
        this.x+=this.px;
        this.y+=this.py;
        this.width+=this.pw;
        this.height+=this.ph;
        this.deg += this.pdeg;
    }

    draw(){
        // this.ctx.translate(50, 50);
        // this.ctx.rotate(30 *  Math.PI / 180); 
        // this.ctx.drawImage('../../images/icon.png', -50, -50, 100, 100);
        // this.ctx.rotate(-30 *  Math.PI / 180); 
        // this.ctx.translate(-50, -50);

        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.deg); 
        this.ctx.drawImage(this.src, - this.width/2, - this.height/2, this.width, this.height);
        this.ctx.rotate(-this.deg);
        this.ctx.translate(-this.x, -this.y);
    }
}