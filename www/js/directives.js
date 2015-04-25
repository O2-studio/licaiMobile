angular.module('licai.directives', [])

.directive('widgetStar', function(){
    function link($scope, $el) {
        var i,
            star = '<span class="ion-ios-star"></span>',
            outletStar = '<span class="ion-ios-star-outline"></span>';
        for(i = 0; i < 5; i++) {
            $el.append(i<$scope.star ? star : outletStar);
        }
    }


    return {
        restrict: 'E',
        scope: {
            star: '=num'
        },
        link: link,
        transclude: true
    }
});
;
