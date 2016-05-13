angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, LogItems) {
    $scope.logItems = LogItems.all();
    $scope.createMD5Hash = function(pwd){
        if (undefined == pwd) {
            $scope.hash="";
            return
        };
        var h = CryptoJS.MD5(pwd)
        $scope.hash=h;
        LogItems.add("Creating new Hash for '"+pwd+"'",
        "We create another md5 hash '"+h+"'");
    };
    
    $scope.findPasswordForThisMD5Hash=function(hash,find_this_pwd){
            LogItems.add(   "Cracking Hash of pwd '"+find_this_pwd+"'",
                        "Brute-force crack '"+$scope.hash+"'.");
        var pwd_length = find_this_pwd.length
        var maxTries = Math.pow(10,pwd_length)
        console.log(    "With password of length "+pwd_length+" we need max "+maxTries+" tries.")
        LogItems.add(   "Cracking Info", 
                        "For length "+pwd_length+" we need max "+maxTries+" tries.");
        var starttime = new Date()
        var pwd="Sorry, password not found for given hash with brute-force from 0.."+maxTries
        var try_hash
                        // TODO move this to a background thread... 
        for (var i=0;i<maxTries;i++){
            try_hash = CryptoJS.MD5( String(i) )
            if ($scope.hash.toString() == try_hash.toString()) {
                //console.log("Found at ", i)
                pwd=String(i)
                break;
            }else{
                // console.log(i+" try_hash: "+try_hash+" =? "+$scope.hash)
            };
        };
        var duration= (new Date() - starttime)/1000
        LogItems.add(   "Password '"+pwd+"' found!",
                        "Cracked the md5 hash 'in "+duration+"'s with brute-force.");


    };
    
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
