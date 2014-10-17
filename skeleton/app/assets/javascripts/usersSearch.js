$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = $('input');
  this.$ul = $('ul.users');
  this.listener();
};


$.UsersSearch.prototype.listener = function () {
  var that = this;
  this.$input.on('keypress', function (event) {
    var thisEvent = this;
    setTimeout(function() {
      var formData = $(thisEvent).serialize();
      that.handleInput(formData);
    }, 0);
  })


};


$.UsersSearch.prototype.handleInput = function (input) {

  $.ajax({
    type: 'get',
    url: '/users/search',
    dataType: 'json',
    data: input,
    success: function(receivedData) {

      this.renderResults(receivedData);
    }.bind(this)
  })
};

$.UsersSearch.prototype.renderResults = function(receivedData) {
  this.$ul.empty();

  var that = this;
  receivedData.forEach(function(item){
    var $li = $("<li></li>");
    $li.append(item.username);
    var userId = " data-user-id=\"" + item.id + "\" ";
    // var initialFollowState = "current_user"
    var IFS = 'data-initial-follow-state="<%=current_user.follows?(user) ? "followed" : "unfollowed" %>"';
    var $button = $("<button class='follow-toggle'" + userId + "></button>");
    $li.append($button);
    that.$ul.append($li);
  });

    $("button.follow-toggle").followToggle();

};

$.UsersSearch.prototype.buttonText = function (users) {
  var allUsers = [];
  //code here!
}


// $.ajax({
//   type: action,
//   url: url,
//   dataType: "json",
//   success: function() {
//     this.$followState = successState;
//     this.pendingFlag = false;
//     this.render();
//   }.bind(that)
// });


$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};