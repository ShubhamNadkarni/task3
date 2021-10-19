
   
   
   
   
myApp = angular.module('myApp', ['ui.grid','ui.grid.pagination'])
myApp.controller('testController', ['$scope', function($scope) {


  $scope.gridOptions = {

    
paginationPageSizes: [25, 50, 75],

paginationPageSize: 5,
    enableFiltering: true,
    enableSorting: true,
    
    columnDefs: [
    
    { field: 'City' },
    
    { field: 'Count' },
    
    
    ],
    
    onRegisterApi: function (gridApi) {
    
    $scope.grid1Api = gridApi;
    
    }
  };
 // var output;

  $scope.myFunction=function(){
      var str= $scope.name1;
      
  var array=[];
  var unique;
  
  
      array= str.split(",")
      
      var ar = [];
      
     
       unique = array.filter((v, i, a) => a.indexOf(v) === i);

       console.log(unique);

     function countInArray(array, Count) {
       return array.reduce((n, x) => n + (x === Count), 0);
     }
    //  var v = countInArray(array,"pune");
    //  console.log(v);
      // console.log(unique);
     unique.forEach((element) => {
       ar[element] = countInArray(array, element);
     });
    //  console.log(ar);
      var output = Object.entries(ar).map(([City,Count]) => ({ City, Count }));
     const arobj= JSON.stringify(output);
     console.log(output);
    console.log("Output 1 : \n",arobj);

    

  
  
  
  
  $scope.users = output;
  
  $scope.gridOptions.data = $scope.users;

  
  
        
  
  
    
  //vm.title="Angular Grid"

    // $scope.sortColumn = "key";
    // $scope.reverseSort = false;

    // $scope.sortData = function (column) {
    //     $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
    //     $scope.sortColumn = column;
    // }

    // $scope.getSortClass = function (column) {

    //     if ($scope.sortColumn == column) {
    //         return $scope.reverseSort
    //           ? 'arrow-down'
    //           : 'arrow-up';
    //     }
    

    //     return '';
    // // }
    // $scope.output= output;

    // $scope.gridOptions.data = $scope.users;

    
     }
     
    // $scope.gridoptions ={
    //   enableSorting: true,
    //   columnDefs:[
    //     {field : "key", enableSorting:false},
    //     {field : "Count", enableSorting:false}
    //   ]
    //   };
    
    // $scope.gridoptions.data=$scope.output;
    
     
    

     }]);
