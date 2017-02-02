/* TO PUBLISH AN EVENT:

    PUBSUB.publish("/page/load", {
        url: "/some/url/path" // any argument
    });


    TO SUBSCRIBE TO AN EVENT:

    var subscription = PUBSUB.subscribe("/page/load", function (obj) {
        // Do something once the event is fired
    });

    TO REMOVE A SUBSCRIPTION:

    subscription.remove();
     
 */

var PUBSUB = (function () {
  var topics = {};
  var hasOwnPropery = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
        if (!hasOwnProperty.call(topics, topic)) {
            topics[topic] = [];
        }

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
        if (!hasOwnProperty.call(topics, topic)) {
            return;
        }

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
      		item(info !== undefined ? info : {});
      });
    }
  };
})();
