// Code goes here

//creating a module called display_parks
var app = angular.module('display_parks', []);


// service that fetch data from json file
app.service("getParks", function($http) {
    this.returnedobj = function() {
        // console.log($http.get("parks.json"));
        return $http.get("parks.json");
    }
});

// controller accessing data from service
app.controller("controllerr_parks", function(getParks) {
    var that = this;

    getParks.returnedobj().then(function(response) {
        that.obj = JSON.parse(JSON.stringify(response.data.Parks));
        //console.log(that.obj);
        that.obj.forEach(function(item) {
            item.shouldShow = false;
        });
        // console.log(that.obj[0]);

        for (var i = 0; i < response.data.Parks.length; i++) {
            that.object_keys = Object.keys(response.data.Parks[i].details);
            console.log(that.object_keys);
        }
    });

    // toggle show or hide data
    that.showDetails = function(index) {
        that.obj.forEach(function(item) {
            item.shouldShow = false;
        });
        that.obj[index].shouldShow = true;
    }

    // setting background color if clicked on name of the park
    that.getBackgroundColor = function(index) {
        var remove_character = that.obj[index].details.Area.substring(0, that.obj[index].details.Area.indexOf(' '));
        var y = remove_character.indexOf(',');
        var number = parseInt(remove_character.substring(0, y) + remove_character.substring(y + 1, remove_character.length));

        if (number < 2000) {
            return that.obj[index].color;
        }

    }

});