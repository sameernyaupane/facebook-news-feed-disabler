(function() {  
  var newsFeedDisabledElement = document.getElementById('news-feed-disabled');

  chrome.storage.sync.get(['newsFeedDisabled'], function(result) { 
    if(result.newsFeedDisabled !== undefined) {
      newsFeedDisabledElement.checked = result.newsFeedDisabled; 
    }
  });
  
  setTimeout(function() { 
    var addedStyle = document.createElement("style");
    addedStyle.innerHTML =
     '.onoffswitch-label {transition: background-color 0.3s ease-in}\
     .onoffswitch-label:before {transition: all 0.3s ease-in 0s;}';

    document.head.appendChild(addedStyle);
  }, 5);

  newsFeedDisabledElement.addEventListener('change', function(event) {
    if (event.target.checked) {
      setNewsFeedDisabledBoolean(true);
    } else {
      setNewsFeedDisabledBoolean(false);
    }
  });

  var setNewsFeedDisabledBoolean = function(newsFeedDisabled) {
    chrome.storage.sync.set({newsFeedDisabled: newsFeedDisabled}, function() {});
  }

})();