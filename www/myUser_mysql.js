var app=angular.module('myApp', ['ngRoute']);

 app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/',{
        templateUrl:'angularjs_hw4_1.html',
        controller: 'userCtrl'
    }).
    when('/create/:id',{
        templateUrl:'angularjs_hw4_2.html',
        controller: 'userCtrl1'
    }).
    when('/edit/:id',{
      templateUrl:'angularjs_hw4_3.html',
      controller:'userCtrl2'
    }).
    otherwise({redirectTo:'/'});
}]);


app.factory('Users', function($http){
       
       var getAllUsers = function(){
          return $http.get('/users/getAllUsers');
        } 
        var getUsersByID =  function(id){
          return $http.get('users/getUsersByID/'+id);
        }
        var deleteUsersByID = function(id){
           return $http.delete('users/deleteUsersByID/'+id);
        }
        var updateUsersByID = function(obj){
            return $http.put('users/updateByID/'+obj.id,JSON.stringify(obj)).then(function(response){
              if(response.data){
                  console.log("Put Data Method Executed Successfully!");
              }

            });
        }
        var createNewUser = function(obj){
            return $http.post('/users',JSON.stringify(obj)).then(function(response){
              if(response.data){
                console.log("Create New User Executed Successfully!");
              }
            });
        }
      
      return {
          getAllUsers: getAllUsers,
          getUsersByID:getUsersByID,
          deleteUsersByID:deleteUsersByID,
          updateUsersByID:updateUsersByID,
          createNewUser:createNewUser

      };
    }
    );


app.controller('userCtrl', function($scope, Users,$location,$route) {
Users.getAllUsers().then(function(msg){
             $scope.msg = msg;
             $scope.users = angular.fromJson(msg).data;
             console.log(angular.fromJson(msg).data);
             $scope.id = angular.fromJson(msg).data.id;

      });



//sort 
$scope.sortType = 'fName'; 
$scope.sortReverse = false; 
$scope.searchUser = ''; 





$scope.deleteUser = function(id){
  Users.deleteUsersByID(id);
  Users.getAllUsers().then(function(msg){
             
             $scope.users = angular.fromJson(msg).data;
              $location.path('/');
               $route.reload();
               console.log("delete");
    
            

      });
};

});


app.controller('userCtrl1', function($scope , $location, $routeParams,Users,$route) {

  

  
  
  
  $scope.fName = '';
  $scope.lName = '';
  $scope.sex = '';
  $scope.title = '';
  $scope.age = '';
  $scope.passw1 = '';
  $scope.passw2 = '' ;
  $scope.error = false;
  $scope.incomplete = false; 
 
  

 $scope.$watch('passw1',function() {$scope.test();});
 $scope.$watch('passw2',function() {$scope.test();});
 $scope.$watch('fName',function() {$scope.test();});
 $scope.$watch('lName',function() {$scope.test();});
 $scope.$watch('title',function() {$scope.test();});
 $scope.$watch('sex',function() {$scope.test();});
 $scope.$watch('age',function() {$scope.test();});




$scope.upDate = function(){
     
     
     var obj=new Object();
     //obj.id= $scope.id;
      
     obj.fName = $scope.fName;
     obj.lName = $scope.lName;
      obj.title = $scope.title;
      obj.sex = $scope.sex;
      obj.age = $scope.age;
      
       Users.createNewUser(obj);
      $location.path('/');
      $route.reload();
    
   
      
    
      
};

 $scope.test = function() {
if ($scope.passw1 !== $scope.passw2) {
  $scope.error = true;
  } else {
  $scope.error = false;
  }
  $scope.incomplete = false;
  if (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length 
  || !$scope.title.length || !$scope.sex.length
  || !$scope.age.length) {
    $scope.incomplete = true;
  }

  };

});
app.controller('userCtrl2', function(Users,$scope, $routeParams, $location,$route) {
  
  $scope.users = new Array();
  $scope.id_2 = $routeParams.id;
  console.log($scope.id_2);

           $scope.fName = '';
             $scope.lName = ''; 
             $scope.sex = '';
             $scope.title = '';
            $scope.age = '';
 
    Users.getUsersByID($scope.id_2).then(function(msg){
             $scope.msg = msg;
             
             $scope.users = angular.fromJson(msg).data;
             // console.log($scope.users);
             $scope.fName = $scope.users[0].fName;
             $scope.lName = $scope.users[0].lName; 
             $scope.sex = $scope.users[0].sex;
             $scope.title = $scope.users[0].title;
            $scope.age = $scope.users[0].age;
 
  

      });
  
  $scope.passw1 = '';
  $scope.passw2 = '' ;

             
  $scope.error = false;
  $scope.incomplete = false; 
  
  

  $scope.$watch('passw1',function() {$scope.test();});
  $scope.$watch('passw2',function() {$scope.test();});
  $scope.$watch('fName',function() {$scope.test();});
  $scope.$watch('lName',function() {$scope.test();});
  $scope.$watch('title',function() {$scope.test();});
  $scope.$watch('sex',function() {$scope.test();});
  $scope.$watch('age',function() {$scope.test();});


$scope.upDate = function(){
      var updataObj ={};
      updataObj.id = $routeParams.id;
      updataObj.fName = $scope.fName;
      updataObj.lName = $scope.lName;
      updataObj.title = $scope.title;
      updataObj.sex = $scope.sex;
      updataObj.age = $scope.age;

    Users.updateUsersByID(updataObj);
       $location.path('/');
       $route.reload();
    
      
    
      
};

$scope.test = function() {
if ($scope.passw1 !== $scope.passw2) {
  $scope.error = true;
  } else {
  $scope.error = false;
  }
  $scope.incomplete = false;
  if (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length 
  || !$scope.title.length || !$scope.sex.length
  || !$scope.age.length) {
    $scope.incomplete = true;

  }

  };



});