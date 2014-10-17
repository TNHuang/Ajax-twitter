$.FollowToggle = function (el) {
  this.$el = $(el);
  this.$userId = this.$el.data("user-id");

  this.$followState = this.$el.data("initial-follow-state");
  this.render();
  this.handleClick();
  this.pendingFlag = false;
};

$.FollowToggle.prototype.handleClick = function () {
  var that = this;

  this.$el.on('click', function(event) {
    event.preventDefault();
    if (that.pendingFlag === true) { return; };
    that.pendingFlag = true;
    that.render();

    var $target = $(event.currentTarget);
    var action = (that.$followState === 'followed' ? 'delete' : 'post');
    var successState = (that.$followState === 'followed' ? 'unfollowed' : 'followed');
    var url = "/users/" + that.$userId + "/follow";


    $.ajax({
      type: action,
      url: url,
      dataType: "json",
      success: function() {
        this.$followState = successState;
        this.pendingFlag = false;
        this.render();
      }.bind(that)
    });

  })
};


$.FollowToggle.prototype.render = function () {
  if (this.pendingFlag) {
    this.$el.attr('disabled', 'disabled');
  }else{
    this.$el.removeAttr('disabled');
  }
  if (this.$followState === "followed") {
    this.$el.html('Unfollow');
  }else {
    this.$el.html('Follow');
  }

};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};
