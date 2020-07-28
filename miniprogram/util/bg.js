import {random} from "./util";

const COLORS = [
    'rgba(247,180,9,.8)',
    'rgba(23,181,173,.8)',
    'rgba(20,161,244,.8)',
    'rgba(46,209,144,.8)',
    'rgba(234,118,129,.8)',
    'rgba(49,126,255,.8)',
    'rgba(253,140,80,.8)'
]

let bg = '';
let width,height;
let timer = 0;
let color

let bgs = [];
const MAX_LENGTH = 3;


let bgPool = [];
let POOL_LENGTH = 20;
let poolIndex = 0;


let bgObj = null;
let touchIndex = 0;

export function initBg(_width, _height){
    width = _width;
    height = _height;
}

export function setBg(index){
    // touchIndex = index;
    // if(!bgObj){
    //     bgObj = new Bg(touchIndex);
    // }
    let bg = null;
    if(bgPool.length>=POOL_LENGTH){
        bg = bgPool[poolIndex];
        bg.reinit(index);
        poolIndex++;
        if(poolIndex>=POOL_LENGTH){
            poolIndex = 0;
        }
    }else{
        bg = new Bg(index)
        bgPool.push(bg);
    }

    if(bgs.length>=MAX_LENGTH){
        bgs[0].disable();
        bgs.shift();
    }
    bgs.push(bg);
    // console.log(bgs);
}

export function drawBg(ctx){
    bgs.forEach(bg=>{
        bg.move();
        bg.draw(ctx);
    })

    // if(!bgObj || touchIndex === -1){
    //     return;
    // }
    // if(bgObj.disabled){
    //     bgObj.reinit(touchIndex);
    //     touchIndex = -1;
    // }
    // bgObj.move();
    // bgObj.draw(ctx);
}

class Bg{
    constructor(index){
        this.reinit(index);
    }

    reinit(index){
        this.disabled = false;
        this.show = true;
        this.color = COLORS[index%7];
        this.dirc = random(0,3);
        if(this.dirc === DIRC.UP || this.dirc === DIRC.DOWN){
            this.width = width;
            this.height = 0;
            this.step = height / 40;
        }else{
            this.width = 0;
            this.height = height;
            this.step = width / 40;
        }
    }
    pause(){
        this.paused = true;
        setTimeout(()=>{
            this.show = false;
            this.paused = false;
        }, 300)
    }
    move(){
        if(this.disabled || this.paused){
            return;
        }
        if(this.dirc === DIRC.UP || this.dirc === DIRC.DOWN){
            if(this.height >= height && this.show){
                this.pause()
            }
            if(this.show){
                this.height += this.step;
            }else{
                this.height -= this.step;
            }
            if(this.height<=0){
                this.height = 0;
                this.remove();
            }
        }else{
            if(this.width >= width && this.show){
                this.pause()
            }
            if(this.show){
                this.width += this.step;
            }else{
                this.width -= this.step;
            }
            if(this.width<=0){
                this.width = 0;
                this.remove();
            }
        }
        // if(this.dirc === DIRC.UP || this.dirc === DIRC.DOWN){
        //     this.height += this.step;
        //     if(this.height>height){
        //         this.height = height;
        //         setTimeout(()=>{
        //             this.remove();
        //         },500)
        //     }
        // }else{
        //     this.width += this.step;
        //     if(this.width>width){
        //         this.width = width;
        //         setTimeout(()=>{
        //             this.remove();
        //         },500)
        //     }
        // }
    }
    draw(ctx){
        if(this.disabled){
            return;
        }
        ctx.setFillStyle(this.color)
        if(this.dirc === DIRC.UP){
            if(this.show){
                ctx.fillRect(0, 0, this.width, this.height);
            }else{
                ctx.fillRect(0, height - this.height, this.width, this.height);
            }
        }else if(this.dirc === DIRC.LEFT){
            if(this.show){
                ctx.fillRect(0, 0, this.width, this.height);
            }else{
                ctx.fillRect(width - this.width, 0, this.width, this.height);
            }
        }else if(this.dirc === DIRC.DOWN){
            if(this.show){
                ctx.fillRect(0, height - this.height, this.width, this.height);
            }else{
                ctx.fillRect(0, 0, this.width, this.height);
            }
        }else if(this.dirc === DIRC.RIGHT){
            if(this.show){
                ctx.fillRect(width - this.width, 0, this.width, this.height);
            }else{
                ctx.fillRect(0, 0, this.width, this.height);
            }
        }
    }
    disable(){
        this.disabled = true;
    }
    remove(){
        this.disable();
        bgs.splice(bgs.indexOf(this), 1);
    }
}

const DIRC = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}