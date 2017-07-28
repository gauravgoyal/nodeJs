var length = process.argv.length;
var sum = 0;
if (length > 2) {
  for (var i = 2; i < length; i++) {
    sum += Number(process.argv[i]);
  }
}
console.log(sum);
