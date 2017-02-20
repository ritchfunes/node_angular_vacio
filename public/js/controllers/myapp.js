var app = angular.module('myapp', []); 
app.controller('personcontroller', [ '$scope', '$http',  function($scope , $http){
 $scope.mensaje = "hola mundo";


$scope.llenartabla = function(){
$http.get('/api/personas')
.then(function(response){
	console.log(response.data);
	$scope.personas = response.data ; 
}, function(response){
	console.log('hubo error al conectar al servidor');
    });
  
  } ; 
  

$scope.llenartabla();
   }
	]); 

