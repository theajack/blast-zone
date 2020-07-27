import { W_SIZE, H_SIZE, curTouchIndex} from './touch';


let unlockedIndex = [4,6,8,10,12,14,16];

let unlockedPos = []

let width,height;

export function initMusicPos(_width, _height){
    width = _width / W_SIZE;
    height = _height / H_SIZE;
    let v = wx.getStorageSync('__music')
    if(v){
        unlockedIndex = v.split(',');
    }
    unlockedIndex.forEach(index=>{
        unlockedPos.push(genePos(index));
    })
}

export function saveUnlockedIndex(){
    wx.setStorageSync('__music', unlockedIndex.join(','))
}

export function addNewPos(index){
    unlockedIndex.push(index);
    unlockedPos.push(genePos(index));
}

function genePos(index){
    return {
        x: index % W_SIZE,
        y: Math.floor(index / W_SIZE),
    }
}

export function drawPos(ctx){
    unlockedPos.forEach(pos=>{
        ctx.setFillStyle('rgba(0,0,0,.1)')
        ctx.fillRect(pos.x * width, pos.y * height, width, height);
    })
    if(curTouchIndex!==-1){
        let pos = genePos(curTouchIndex);
        ctx.setFillStyle('rgba(255,255,255,.3)')
        ctx.fillRect(pos.x * width, pos.y * height, width, height);
    }
}