/**
 * Created by chihhsien on 10/19/15.
 */
'use strict';

angular.module('mxviewCloud')
  .controller('SmartTableCtrl', ['$scope', 'Socket', function ($scope, Socket) {

    //var vm = this;

    var MXviewSiteName = ['Site1','Site2','Site3'];
    var informationEvent = [3,2,1];
    var criticalEvent = [10,5,1];
    var warningEvent = [3,5,1];
    var id = 0;

    $scope.rowCollection = [];

    Socket.on('connect', function(){
      $scope.title = 'connected';
    });

    Socket.on('user connected', function(msg){
      $scope.promo = msg;
    });

    Socket.on('mxviewcloud trigger_data', function (msg) {
      console.log('trigger_data=' + msg);
      var update_data = JSON.parse(msg);
      $scope.rowCollection[update_data['regKey']].informationEvent = parseInt(update_data['information_count']);
      $scope.rowCollection[update_data['regKey']].criticalEvent = parseInt(update_data['critical_count']);
      $scope.rowCollection[update_data['regKey']].warningEvent = parseInt(update_data['warning_count']);

      $scope.displayedCollection = $scope.rowCollection;
    });

    Socket.on('mxviewcloud dashbaord', function(msg){
      //$scope.promo = msg;
      //var mxregister_data = JSON.parse(msg);
      /*for(var myKey in mxregister_data){
        //if(mxregister_data.hasOwnProperty('serverName')) {
         // MXviewSiteName[0] = mxregister_data[1]['serverName'];

          $scope.rowCollection[0].sitename = mxregister_data['serverName'];
          $scope.rowCollection[0].informationEvent = mxregister_data['deviceNormal'];
          $scope.rowCollection[0].criticalEvent = mxregister_data['deviceCritical'];
          $scope.rowCollection[0].warningEvent = mxregister_data['deviceWarning'];

          $scope.displayedCollection = $scope.rowCollection;
        //}
      }*/
      for(var i = 0; i<msg.length; i++){
        var site_data = {
          id: msg[i]['dashboard_data']['_id'],
          sitename: msg[i]['dashboard_data']['serverName'],
          informationEvent: msg[i]['dashboard_data']['deviceNormal'],
          criticalEvent: msg[i]['dashboard_data']['deviceCritical'],
          warningEvent: msg[i]['dashboard_data']['deviceWarning']
        };

        $scope.rowCollection.push(site_data);
      }

      $scope.displayedCollection = [].concat($scope.rowCollection);
      //$scope.displayedCollection = $scope.rowCollection;
      //mxregister_data.forEach(function(item, index) {
        //console.log("result="+mxregister_data[index]);
      //})
    });


    function generateItem(id) {
      var sitename = MXviewSiteName[id];
      var informationCount = informationEvent[id];
      var criticalEventCount = criticalEvent[id];
      var warningEventCount = warningEvent[id];

      return {
        id: id,
        sitename: sitename,
        informationEvent: informationCount,
        criticalEvent: criticalEventCount,
        warningEvent: warningEventCount
      }
    }

    function generateRandomItem(id) {

      var sitename = MXviewSiteName[Math.floor(Math.random() * 3)];
      var informationCount = informationEvent[Math.floor(Math.random() * 3)];
      var criticalEventCount = criticalEvent[Math.floor(Math.random() * 3)];
      var warningEventCount = warningEvent.floor(Math.random() * 2000);

      return {
        id: id,
        sitename: sitename,
        informationEvent: informationCount,
        criticalEvent: criticalEventCount,
        warningEvent: warningEventCount
      }
    }

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
      $scope.rowCollection.push(generateRandomItem(id));
      id++;
    };



    /*for(id; id<3; id++) {
      $scope.rowCollection.push(generateItem(id));
    }

    $scope.displayedCollection = [].concat($scope.rowCollection);*/

    $scope.addItem = function addItem() {
      $scope.rowCollection.push(generateItem(id));
    }

    $scope.removeItem = function removeItem(row) {
      var index = $scope.rowCollection.indexOf(row);
      if(index != -1) {
        $scope.rowCollection.splice(index, 1);
      }
    }

    //angular.extend(vm, {
     // name: 'smart table'
    //});

  }]);
