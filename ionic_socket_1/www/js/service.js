/**
 * Created by MuDi Ahmed on 23/02/2016.
 */
angular.module('services',[])

.service('users',['$window',function($window){
    var setUser = function(userData){
        //user=userData;
        //sessionStorage.userService = angular.toJson(userData);
        $window.localStorage["user"] = JSON.stringify(userData);
    };
    var getUser = function(){
        return JSON.parse($window.localStorage['user'] || null);
    };

    return {
        setUser:setUser,
        getUser:getUser
    }
}]);