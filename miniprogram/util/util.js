export function random(a, b) {
  return (a + Math.round(Math.random() * (b - a)))
};

export function nowDateTime(){
  return (new Date()).getTime();
}