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

.controller('trustsCtrl', function($scope, Trust){
    $scope.categoryList = Trust.allCategory();
})

.controller('SelectedTrustsCtrl', function($scope, Trust){
    Trust.allFunds().then(function(list){
        $scope.fundList = list;
    });
})

.controller('trustCtrl', function ($scope, $stateParams, Trust, $ionicPopup, PreOrder) {
    Trust.getById($stateParams.id).then(function (trust) {
        $scope.trustId = trust.id;
        $scope.fund = trust;
    });


    $scope.showPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div><span>您的姓名:</span><input type="text" ng-model="data.name"></div><div><span>手机号码:</span><input type="text" ng-model="data.phone"></div>',
            title: '该产品火热募集中',
            subTitle: '留下联系方式，我们帮您第一时间抢占稀缺额度',
            scope: $scope,
            buttons: [
                {
                    text: '<b>提交预约</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.phone || !$scope.data.name) {
                            e.preventDefault();
                        } else {
                            return {
                                userName: $scope.data.name,
                                userPhone: $scope.data.phone,
                                id: $scope.trustId
                            };
                        }
                    }
                }
            ]
        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
            PreOrder.submit(res).then(function(){
                $ionicPopup.alert({
                    title: '成功',
                    template: '已预约，我们的客服会尽快联系您！'
                });
            });
        });
//        $timeout(function () {
//            myPopup.close(); //close the popup after 3 seconds for some reason
//        }, 3000);
    };
})
;

