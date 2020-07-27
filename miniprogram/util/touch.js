
export const W_SIZE = 3;

export const H_SIZE = 7;

let width=0,height=0;

export let curTouchIndex = -1;

export function initSize(_width, _height){
    width = _width / W_SIZE;
    height = _height / H_SIZE;
}

export function ontouch(e){
    let curIndex = getIndex(e);
    if(e.type === 'touchstart'){
        curTouchIndex = curIndex;
    }else if(e.type === 'touchmove'){
        if(curIndex !== curTouchIndex){
            curTouchIndex = curIndex;
        }else{
            return -1;
        }
    }else{
        curTouchIndex = -1;
    }
    return curTouchIndex;
}

function getIndex(e){
    if(!width){ 
        return 0;
    }
    let touch = e.changedTouches[0];
    let x = Math.floor(touch.x/width);
    let y = Math.floor(touch.y/height);
    return y*W_SIZE+x;
}