/*global angular*/
(function withAngular(angular) {
  'use strict';

  angular.module('Send.controller', [])
  .controller('SendCtrl', ['$rootScope', '$scope', '$window', '$log', '$stateParams', '$filter', 'BitCoin', 'CordovaClipboard', '$timeout',
    function SendCtrlController($rootScope, $scope, $window, $log, $stateParams, $filter, BitCoin, CordovaClipboard, $timeout) {

    var onNFCTag
      , inputToAddressElement = $window.document.getElementById('toAddress');
    $scope.sendForm = {};
    $scope.publicAddress = BitCoin.address;
    $scope.sendForm.toAddress = $stateParams.nfcAddress || undefined;

    if ($scope.sendForm.toAddress) {

      inputToAddressElement.focus();
    }

    $scope.resetFlags = function resetLayoutFlags() {

      $scope.errorText = undefined;
      $scope.successText = undefined;
    };

    $scope.waitNFCTag = function waitNFCTag() {

      if (!$scope.waitingNFC) {

        $scope.waitingNFC = true;
      } else {
        $scope.waitingNFC = undefined;
      }
    };

    $scope.sendBtc = function sendBtc() {

      if (!$scope.sending) {

        var amountSatoshi = $filter('UnitConvert')(Number($scope.sendForm.outputAmount), 'mbtcToSatoshis');

        $scope.resetFlags();
        $scope.sending = true;

        $log.debug('amount: ' + Number($scope.sendForm.outputAmount) + ', address: ' + $scope.sendForm.toAddress);

        BitCoin.send(amountSatoshi, $scope.sendForm.toAddress).then(function onSent(response) {

          $log.debug('SENT');
          $log.debug('response: ' + JSON.stringify(response));

          $scope.$apply(function apply(){
            $scope.sending = false;
            $scope.successText = 'Payment sent.';
            $scope.errorText = false;
          });

          // TODO: FIX bugs
          // la view si dovrebbe refreshare cosi' che riaggiorna il balance (deve diminuire dopo aver inviato i btc)
        }).catch(function onError(error){

          $log.debug('catched error: ' + error.message);

          // TODO: catch transaction#serialize - amountError (if it's trying to send more than what's in the phone wallet)

          $scope.$apply(function apply() {
            $scope.errorText = error.message;
            $scope.successText = false;
            $scope.sending = undefined;
          });
        });
      }
    };

    $scope.copyFromClipboard = function copyFromClipboard() {

      $scope.resetFlags();

      if (!$scope.copied) {

        CordovaClipboard.paste().then(function onPaste(clipboardText) {

          if (clipboardText &&
            clipboardText.match(/^[13][^O0Il]{25,33}/)) {

            $scope.sendForm.toAddress = clipboardText;
            $scope.copied = !$scope.copied;
          } else {

            $scope.copied = false;
            $scope.errorText = 'Clipboard doesn\'t cointain an address.';
            $log.debug('Clipboard doesn\'t cointain an address.');
          }

        }).catch(function onCopyError(error) {

          $log.debug('Unable to copy to clipboard', error);
        });
      }
    };

    BitCoin.balance().then(function onBalance(balance) {

      $scope.balance = balance;
    });

    onNFCTag = $rootScope.$on('nfc:status-message', function onNFCTag() {

      $scope.waitingNFC = undefined;
    });

    $scope.$on('$destroy', function onDestroy() {

      onNFCTag();
    });

    $scope.$on('focus', function setFocus() {
      $timeout(function(){
        document.querySelector("input[type=number]").focus();
      }, 1);
    });
  }]);
}(angular));
