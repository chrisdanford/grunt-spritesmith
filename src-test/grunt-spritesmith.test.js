var fs = require('fs');

module.exports = {
  spritesmith: function (test) {
    // Load in the images
    // TODO: If this were BDD, we should be loading this into a canvas and doing a threshold comparison there (i.e. are the images 90% similar)
    var expectedImage = fs.readFileSync(__dirname + '/expected_files/sprite.png', 'binary'),
        actualImage = fs.readFileSync(__dirname + '/scratch/sprite.png', 'binary');

    // Assert they are equal
    test.strictEqual(expectedImage, actualImage, 'Actual image does not match expected image');

    // Load in the sprite positions
    // TODO: If this were BDD, we would be asserting the same variables exist -- which means loading this into either Stylus or a meta-language
    var expectedCoords = fs.readFileSync(__dirname + '/expected_files/sprite_positions.styl', 'utf8'),
        actualCoords = fs.readFileSync(__dirname + '/scratch/sprite_positions.styl', 'utf8');

    // Break up the expected coords into each line
    var expectedLines = expectedCoords.split(/\n/g);

    // Iterate over each line
    expectedLines.forEach(function (line) {
      // Trim the line
      line = line.trim();

      // If there is no line, skip it
      if (!line) {
        return;
      }

      // Assert that the line exists in actualCoords
      var index = actualCoords.indexOf(line);
      test.notEqual(index, -1, 'Line not found in actual coordinates: ' + line);
    });

    // Callback since we are done testing
    test.done();
  }
};