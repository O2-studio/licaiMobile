angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Category) {
    $scope.categories = Category.all();
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('fundCtrl', function($scope, $state, Funds) {
    function Fund(json) {
        this.name = json.name || '';
        this.on = json.status === 1;
        this.minimal = json.threshold || 1000000;
        this.dueTime = new Date(json.dueTime);
    };


    function goDetail(fundId) {
        console.log(fundId);
        $state.go('tab.dash.fund', {fundId: fundId});
    }

    $scope.goDetail = goDetail;

    Funds.all().then(function(list){
        $scope.items = list;
    });
})

.controller('fundDetailCtrl', function($stateParams, $scope, Funds){
    Funds.get($stateParams.fundId).then(function(fund){
        $scope.fund = fund;
    });
})

.controller('trustCtrl', function($scope, Trust){
    Trust.allFunds().then(function(list){
        $scope.fundList = list;
    });
    $scope.categoryList = Trust.allCategory();
});
;

