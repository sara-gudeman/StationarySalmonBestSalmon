app.controller('EventFormCtrl', ['$scope', '$cookies', 'getGroups', 'CreateEvent', '$location', 'UserService',
  function ($scope, $cookies, getGroups, CreateEvent, $location, UserService) {
  //getGroups.getMyGroups().then(function(response) {
  //  var data = response.data;
  //  $scope.myGroups = data;
  //});

  UserService.get($cookies.get('user_id')).then(function(response) {
    var user = response.data;
    $scope.myGroups = user.groups;
  });

  // get the current date in correct format
  var currDateTime = new Date();
  var currYear = currDateTime.getFullYear();
  var currMonth = currDateTime.getMonth();
  var currDay = currDateTime.getDate();
  var currHour = currDateTime.getHours();
  var currMinute = currDateTime.getMinutes();

  // get correct datemin format
  $scope.datemin = currDateTime.toISOString().split('T')[0] + 'T00:00:00';
  $scope.datetime = new Date(currYear, currMonth, currDay, currHour, currMinute);

  $scope.createEvent = function() {
    var newEvent = {
      title: $scope.title,
      group_id: $scope.selectedGroup._id,
      description: $scope.description,
      user_id: $cookies.get('user_id'),
      datetime: $scope.datetime
    };
    CreateEvent.newEvent(newEvent).then(function(response) {
      $scope.title = '';
      $scope.description = '';
      $scope.selectedGroup = '';
      $location.path('/event/' + response.data._id);
    });
  };
}]);
