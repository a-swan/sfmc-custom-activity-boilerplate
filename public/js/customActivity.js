define([
  'postmonger'
], function (
  Postmonger
) {
  'use strict';

  var connection = new Postmonger.Session();
  var authTokens = {};
  var payload = {};
  const pmLogs = document.getElementById('#postmonger-log');
  $(window).ready(onRender);

  connection.on('initActivity', initialize);
  connection.on('requestedTokens', onGetTokens);
  connection.on('requestedEndpoints', onGetEndpoints);
  connection.on('requestedInteraction', onRequestedInteraction);
  connection.on('requestedTriggerEventDefinition', onRequestedTriggerEventDefinition);
  connection.on('requestedDataSources', onRequestedDataSources);

  connection.on('clickedNext', save);

  function onRender() {
    // JB will respond the first time 'ready' is called with 'initActivity'
    connection.trigger('ready');

    connection.trigger('requestTokens');
    connection.trigger('requestEndpoints');
    connection.trigger('requestInteraction');
    connection.trigger('requestTriggerEventDefinition');
    connection.trigger('requestDataSources');  
  }

  function onRequestedDataSources(dataSources){
    console.log('*** requestedDataSources ***');
    console.log(dataSources);

    pmLogs.innerHTML += `*** requestedDataSources ***<br>${JSON.stringify(dataSources)}`;
  }

  function onRequestedInteraction (interaction) {    
    console.log('*** requestedInteraction ***');
    console.log(interaction);
    pmLogs.innerHTML += `*** requestedInteraction ***<br>${JSON.stringify(interaction)}`;
  }

  function onRequestedTriggerEventDefinition(eventDefinitionModel) {
    console.log('*** requestedTriggerEventDefinition ***');
    console.log(eventDefinitionModel);
    pmLogs.innerHTML += `*** requestedTriggerEventDefinition ***<br>${JSON.stringify(eventDefinitionModel)}`;
  }

  function initialize(data) {
    console.log(data);
    if (data) {
      payload = data;
    }
    
    var hasInArguments = Boolean(
      payload['arguments'] &&
      payload['arguments'].execute &&
      payload['arguments'].execute.inArguments &&
      payload['arguments'].execute.inArguments.length > 0
    );

    var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

    console.log(inArguments);

    console.log('----- triggered:onInitActivity({obj}) -----');
    console.log('activity:\n ', JSON.stringify(payload, null, 4));
    console.log('Has in Arguments: ', hasInArguments);
    console.log('inArguments', inArguments)
    console.log('-------------------------------------------');

    connection.trigger('updateButton', {
      button: 'next',
      text: 'done',
      visible: true
    });
  }

  function onGetTokens(tokens) {
    console.log(tokens);
    authTokens = tokens;
  }

  function onGetEndpoints(endpoints) {
    console.log(endpoints);
  }

  function save() {
    payload['metaData'].isConfigured = true;

    payload.name = 'New saved name';

    console.log('---- triggering:updateActivity({obj}) -----');
    console.log('Sending message to updateActivity');
    console.log('saving\n', JSON.stringify(payload, null, 4));
    console.log('-------------------------------------------');

    connection.trigger('updateActivity', payload);
  }
});