var app = angular.module("uigridApp", ["ui.grid"]);

app.controller(
  "uigridCtrl",
  function ($scope, $http, uiGridConstants, $filter) {
    $http.get("data.json").then(function (response) {
      $scope.new = response.data;
      var nu = response;
      console.log(nu);
    });
  }
);
