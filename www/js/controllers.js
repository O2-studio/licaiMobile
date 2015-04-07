angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

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

.controller('fundCtrl', ['$scope','$state', function($scope, $state) {
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

    $scope.items = [
        {
            name:'创富1期',
            on: true,
            staff: {
                name: '蒋勇',
                score: 35.82
            },
            score: 21.26,
            minimal: '100万元',
            id: 1000001
        },
        {
            name:'创富1期',
            on: true,
            staff: {
                name: '蒋勇',
                score: 35.82
            },
            score: 21.26,
            minimal: '100万元',
            id: 1000002
        },
        {
            name:'创富1期',
            ing: true,
            on: true,
            staff: {
                name: '蒋勇',
                score: 35.82
            },
            score: 21.26,
            minimal: '100万元',
            id: 1000003
        },
        {
            name:'创富1期',
            on: true,
            staff: {
                name: '蒋勇',
                score: 35.82
            },
            score: 21.26,
            minimal: '100万元',
            id: 1000004
        }
    ];
}])

.controller('fundDetailCtrl', ['$stateParams', '$scope', function($stateParams, $scope){
    $scope.fundId = $stateParams.fundId;
    console.log($scope.fundId);
}]);
;
