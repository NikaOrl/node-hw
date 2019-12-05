process.stdin.setEncoding('utf8');

process.stdout.write('Input: ');

process.stdin.on('readable', function() {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(
      `Output: ${chunk
        .replace(/\n/g, '')
        .split('')
        .reverse()
        .join('')}\n`
    );
    process.stdout.write('Input: ');
  }
});
