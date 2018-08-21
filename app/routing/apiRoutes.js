var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // Create New Characters - takes in JSON input
    app.post("/api/friends", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body-parser middleware
        var newFriend = req.body;
        var newScores = newFriend.scores.map(Number);

        var diffArray = [];

        for (var i = 0; i < friends.length; i++) {
            var totDiff = 0;
            for (var j = 0; j < 10; j++) {
                totDiff += Math.abs(newScores[j] - friends[i].scores[j]);
            }
            diffArray.push(totDiff)
        }

        var indexOfMatch = diffArray.indexOf(Math.min(...diffArray));

        friends.push(newFriend);
        res.json(friends[indexOfMatch]);

    });
}
