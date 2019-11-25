process.stdin.setEncoding('utf8');

process.stdout.write('Input: ');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read().replace(/\n/g, '');

  process.stdout.write(
    `Output: ${chunk
      .split('')
      .reverse()
      .join('')}\n`
  );
});
