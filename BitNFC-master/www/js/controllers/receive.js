/*global angular*/
(function withAngular(angular) {
  'use strict';

  angular.module('Receive.controller', [])
  .controller('ReceiveCtrl', ['$rootScope', '$scope', '$stateParams', 'BitCoin',
    function ReceiveCtrlController($rootScope, $scope, $stateParams, BitCoin) {

      $scope.publicAddress = BitCoin.address.toString();
      BitCoin.balance().then(function onBalance(balance) {

        $scope.balance = balance;
      });

      var onNFCTag;
      $scope.publicAddress = BitCoin.address;
      $scope.pvk = $stateParams.pvk;

      $scope.waitNFCTag = function waitNFCTag() {

        if (!$scope.waitingNFC) {

          $scope.waitingNFC = true;
        } else {
          $scope.waitingNFC = undefined;
        }
      };

      onNFCTag = $rootScope.$on('nfc:status-message', function onNFCTag() {

        $scope.waitingNFC = undefined;
      });

      $scope.$on('$destroy', function onDestroy() {

        onNFCTag();
      });
  }]);
}(angular));
