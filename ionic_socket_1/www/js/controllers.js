/**
 * Created by MuDi Ahmed on 23/02/2016.
 */
angular.module('controllers',[])


.controller('LoginCtrl',['$scope','users','$state',function($scope,users,$state){
    var user = users.getUser();
    console.log(user);
    if(user!==null){
        $state.go('rooms');
    }
    $scope.login = function(userData){
        console.log(userData);
        io.socket.get('/users', userData, function (resData, jwres){
            users.setUser(resData);
            $state.go('rooms');
        });
    }
}])
.controller('RegisterCtrl',['$scope','$state','users',function($scope,$state,users){
        $scope.register=function(user){
            io.socket.post('/users',user, function(reUser, jwres) {
                users.setUser(reUser);
                $state.go('rooms');
            });
        };
}])
.controller('ChatRoomCtrl',['$scope','$stateParams','users',function($scope,$stateParams,users){
    io.socket.get('/rooms',{id:$stateParams.id}, function(reRoom, jwres) {
        $scope.room = reRoom;
    });
    var user = users.getUser()[0];
    $scope.sendMessage = function(message){
        var sendMessage=message;
        sendMessage.roomID = $stateParams.id;
        sendMessage.userID = user.id;
        io.socket.post('/messages',sendMessage, function(reMessage,jwres){
            console.log(reMessage);
            $scope.messages.push(reMessage);
            console.log($scope.messages);
        });
    };
    io.socket.on('messages', function(event){
        console.log(event);
        if(event.verb==='created'){
            $scope.messages.push(event.data);
            $scope.apply();
        }
    });
    io.socket.get('/messages',{roomID:$stateParams.id}, function(reMessages, jwres) {
        $scope.messages = reMessages;
        $scope.apply();
    });

}])
.controller('RoomsCtrl',['$scope',function($scope){
    io.socket.get('/rooms', function(rooms, jwres) {
        console.log(rooms);
        $scope.rooms = rooms;
    });
}])
.controller('RoomsFormCtrl',['$scope','$state',function($scope,$state){
    $scope.createRoom=function(room){
        io.socket.post('/rooms',room, function(reUser, jwres) {
            $state.go('rooms');
        });
    }
}]);