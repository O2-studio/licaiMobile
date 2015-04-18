angular.module('starter.filters', [])

.filter('saleStatus', function () {
    return function(status){
        switch(status) {
            case 0:
                return '已售完';
                break;
            case 1:
                return '火热募集中';
                break;
        }
    };
})

.filter('money', function(){

    return function(num) {
        if(num > 10000) {
            return num/10000 + '万元';
        }else if(num > 1000) {
            return num/1000 + '千元'
        }else {
            return num + '元';
        }
    };
})

;
