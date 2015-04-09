angular.module('starter.services', [])

.factory('Chats', function () {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
        id: 2,
        name: 'Andrew Jostlin',
        lastText: 'Did you get the ice cream?',
        face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
        id: 3,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
        id: 4,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('Funds', function ($http, $q) {
    function Fund(json) {
        this.name = json.name || '未知基金名称';
        this.on = json.status === 1;
        this.staff = {
            name: json.broker || '基金经理姓名',
            score: json.brokerScore || 10
        };
        this.score = json.profitRate * 100 || 100;
        this.minimal = json.threshold || 1000000;
        this.id = json.id || '000';
        this.price = json.nav || 1;
        this.date = json.startDate;
    }

    var funds = [];


    function pullAll() {
        var url = 'https://apple-pudding-1939.herokuapp.com/products?format=json',
            deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: url
                }).then(function (data) {
                    var fundList = data.data,
                        i = 0,
                        resList = [];
                    for(;i<fundList.length; i++){
                        resList.push(new Fund(fundList[i]));
                    }
                    funds = resList;
                    deferred.resolve(resList);
                }, function (data) {});
        return deferred.promise;
    }

    function pullOne(fundId) {
        var deferred = $q.defer(),
            url = 'https://apple-pudding-1939.herokuapp.com/product/$1?format=json'.replace('$1', fundId);
//        for (var i = 0; i < funds.length; i++) {
//            if (funds[i].id == fundId) {
//                deferred.resolve(funds[i]);
//            }
//        }

        $http.get(url).success(function(json){
            deferred.resolve(new Fund(json));
        });

        return deferred.promise;
    }



    return {
        all: pullAll,
        get: pullOne
    };
});
