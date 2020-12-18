
var app = angular.module("app", ['ui.router']);

app.config([
  "$stateProvider",
  "$locationProvider",
  function ($stateProvider, $locationProvider) {
    $stateProvider
      .state("wizard", {
        url: "/wizard",
        templateUrl: "/static/ng-templates/wizard.html",
        controller: "wizard",
      })
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
    });
  },
]);

app.controller("wizard",function($scope){
  $scope.FAQ = [
    {
      id: 0,
      title: "how to fill the form",
      instruction: [
        {
          stepId: 0,
          step: "enter your Email Id here",
          id: "emailId",
          example: "example@gmail.com",
        },
        {
          stepId: 1,
          step: "enter your Password here",
          id: "password",
          example: "ab@12hs",
        },
        {
          stepId: 2,
          step: "check this box if you agree with the terms and conditions",
          id: "termsAndCondition",
        },
      ],
    },
    {
      id: 1,
      title: "how to do something",
      instruction: [
        {
          stepId: 1,
          step: "enter your Name here",
          id: "emailId",
          example: "example@gmail.com",
        },
        {
          stepId: 2,
          step: "enter your Password here",
          id: "password",
          example: "ab@12hs",
        },
        {
          stepId: 3,
          step: "check this box if you agree with the terms and conditions",
          id: "termsAndCondition",
        },
      ],
    },
  ];
  $scope.info = function(id){
    var instruction  = new Wizard($scope.FAQ,id,3000)
    // var instruction  = new Wizard()
    instruction.play();
    
  }
})




