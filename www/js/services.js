var baseUrl = 'https://apple-pudding-1939.herokuapp.com/';


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

        $http.get(url).success(function(json){
            deferred.resolve(new Fund(json));
        });

        return deferred.promise;
    }



    return {
        all: pullAll,
        get: pullOne
    };
})

.factory('Category', function(){
    var categoryList = [{
        name: '信托产品',
        icon: '/img/icon_xintuo.jpg',
        url: '/xintuo'
    }];

    return {
        all: function(){
            return categoryList;
        }
    };
})

.service('Trust', function($q, $http){
    function Trust(json) {
        this.id = json.id;
        this.name = json.name || '';
        this.threshold = json.threshold || 10000;
        this.dueTime = json.dueTime || 1;
        this.reason = json.reason || '推荐理由';
        this.description = json.shortDesc || '简单介绍';
        this.profitRate = json.profitRate || 0.01;
        this.profitType = json.profitType || '收益类型';
        this.profitDesc = json.profitDesc || '收益简介';
        this.status = json.status || 1;
        this.organization = json.organization || '哲赢理财';
        this.investType = json.investType || '投资方式';
        this.investArea = json.investArea || '投资领域';
        this.total = json.total || 1000000;
        this.investDesc = json.detialDesc || '资金用途';
        this.riskControl = json.riskControl || '风险控制';
    }


    function pullAll() {
        var url = baseUrl + 'trustProducts/json',
            deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: url
                }).then(function (data) {
                    var trustList = data.data,
                        i = 0,
                        resList = [];
                    for(;i<trustList.length; i++){
                        resList.push(new Trust(trustList[i]));
                    }
                    trusts = resList;
                    deferred.resolve(resList);
                }, function (data) {});
        return deferred.promise;
    }

    var trusts = [{
            name: '信托产品 NO.1'
        },
        {
            name: '信托产品 NO.2'
        }],
        categories = [
            {
                name: '信托首页',
                state: 'xintuo'
            },
            {
                name: '优选信托',
                state: 'xintuo.selected'
            }
        ];

    return {
        allFunds: pullAll,
        allCategory: function(){
            return categories;
        }
    };
})
;
