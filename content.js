(function() {
  function prepareStyleElement() {
    var styleElement = document.createElement('style');

    styleElement.id   = 'facebook-news-feed-disabler';
    styleElement.type = 'text/css';

    return styleElement;
  };

  function appendElementToHead(element) {
    document.getElementsByTagName('head')[0].appendChild(element);
  };

  function toggleNewsFeed(newsFeedDisabled) {
    var styleElement = document.getElementById('facebook-news-feed-disabler');

    if(styleElement !== null) {
      document.getElementsByTagName('head')[0].removeChild(styleElement);
    }

    styleElement = prepareStyleElement();

    if(newsFeedDisabled) {
      styleElement.innerHTML = '.newsFeedComposer #contentArea {visibility: hidden;}';
    } else {
      styleElement.innerHTML = '.newsFeedComposer #contentArea {visibility: visible;}';
    }

    appendElementToHead(styleElement);
  };

  chrome.storage.sync.get(['newsFeedDisabled'], function(result) { 
    if(result.newsFeedDisabled === undefined) {
      chrome.storage.sync.set({newsFeedDisabled: true}, function() {});
    } else {
      toggleNewsFeed(result.newsFeedDisabled); 
    }
  });  

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (key in changes) {
      if(key === 'newsFeedDisabled') {
        toggleNewsFeed(changes[key].newValue);
      }
    }
  });
})();