/*global angular*/
(function withAngular(angular) {
  'use strict';

  angular.module('bitNFC.factories', [
    'BitCoin.factory',
    'BlockChain.factory',
    'System.factory']);
}(angular));
