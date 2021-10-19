var app = angular.module("uigridApp", [ "ui.grid"]);

app.controller("uigridCtrl", function ($scope,$http, uiGridConstants,$filter) {



    $scope.myData = [
        {
            firstName: "Cox",
            lastName: "Carney",
            company: "Enormo",
            employed: true
        },
        {
            firstName: "Lorraine",
            lastName: "Wise",
            company: "Comveyer",
            employed: false
        }
    ]
});
        
      
