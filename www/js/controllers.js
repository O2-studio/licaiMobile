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

.controller('fundCtrl', function($scope) {
    $scope.items = [
        {
            name:'创富1期',
            ing: true,
            on: true,
            staff: {
                name: '蒋勇',
                score: 35.82
            },
            score: 21.26,
            minimal: '100万元'
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
            minimal: '100万元'
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
            minimal: '100万元'
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
            minimal: '100万元'
        }
    ];
})
;
