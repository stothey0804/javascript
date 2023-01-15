
console.time('one')
for (let i = 1000; i < 10000; i++) {
  const num = [(i % 10000 / 1000 | 0), (i % 1000 / 100 | 0), (i % 100 / 10 | 0), i % 10];
  if (i === (num[0] + num[1] + num[2] + num[3]) * ((num[0] ** 2 + num[1] ** 2 + num[2] ** 2 + num[3] ** 2) ** 2))
    console.log(i);
}
console.timeEnd('one')


console.time('two')
for(let a = 1; a < 10; a++) {
  for(let b = 0; b < 10; b++) {
    for(let c = 0; c < 10; c++){
      for(let d = 0; d < 10; d++){
        const num = (a*1000 + b*100 + c*10 + d);
        if(num === (a+b+c+d) * ((a**2 + b**2 + c**2 + d**2) **2))
          console.log(num);
      }
    }
  }
}
console.timeEnd('two')