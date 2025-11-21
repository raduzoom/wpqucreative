

export const dzsQuc_wpAddComment = {
  moveForm: function (commId, parentId, respondId, postId) {
    var div, element, style, cssHidden,
      t = this,
      _theLi = t.I(commId),
      respond = t.I(respondId),
      cancel = t.I('cancel-comment-reply-link'),
      parent = t.I('comment_parent'),
      post = t.I('comment_post_ID'),
      commentForm = respond.getElementsByTagName('form')[0];

    console.info('moveForm() from qcreative.js', 'commId ->', commId, 'parentId ->', parentId, respondId, postId);
    console.info('document.getElementById(commId) -> ', document.getElementById(commId));
    console.info('_theLi -> ', _theLi, 'respond -> ', respond, 'cancel -> ', cancel, 'parent -> ', parent, 'commentForm -> ', commentForm);
    if (!_theLi || !respond || !cancel || !parent || !commentForm) {
      return;
    }


    t.respondId = respondId;
    postId = postId || false;

    if (!t.I('wp-temp-form-div')) {
      div = document.createElement('div');
      div.id = 'wp-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore(div, respond);
    }

    _theLi.parentNode.insertBefore(respond, _theLi.nextSibling);
    if (post && postId) {
      post.value = postId;
    }
    parent.value = parentId;
    cancel.style.display = '';

    cancel.onclick = function () {
      var t = dzsQuc_wpAddComment,
        temp = t.I('wp-temp-form-div'),
        respond = t.I(t.respondId);

      if (!temp || !respond) {
        return;
      }

      t.I('comment_parent').value = '0';
      temp.parentNode.insertBefore(respond, temp);
      temp.parentNode.removeChild(temp);
      this.style.display = 'none';
      this.onclick = null;
      return false;
    };

    jQuery(cancel).parent().show();

    try {
      for (var i = 0; i < commentForm.elements.length; i++) {
        element = commentForm.elements[i];
        cssHidden = false;

        // Modern browsers.
        if ('getComputedStyle' in window) {
          style = window.getComputedStyle(element);
        }

        if ((element.offsetWidth <= 0 && element.offsetHeight <= 0) || style.visibility === 'hidden') {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ('hidden' === element.type || element.disabled || cssHidden) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }


      jQuery(_theLi).find('.comment-reply-link').attr('href', '#');


      var _c = jQuery('.comment-reply-title');


      _c.html(qucreative_options.translate_leave_a_comment_to + ' <u>' + jQuery(_theLi).find('.author-name').eq(0).html() + '</u><h6><a rel="nofollow" id="cancel-comment-reply-link" href="' + String(window.location.href).split('#')[0] + '#respond">' + qucreative_options.translate_cancel_comment + '</a></h6>');

      cancel = t.I('cancel-comment-reply-link')


      cancel.onclick = function () {
        var t = addComment,
          temp = t.I('wp-temp-form-div'),
          respond = t.I(t.respondId);

        if (!temp || !respond) {
          return;
        }

        t.I('comment_parent').value = '0';
        temp.parentNode.insertBefore(respond, temp);
        temp.parentNode.removeChild(temp);
        this.style.display = 'none';


        var _c = jQuery('.comment-reply-title');


        _c.html(qucreative_options.translate_leave_a_comment);
        _c.append('<h6 class="cancel-comment-reply-link-con" style="display:none;"><a rel="nofollow" id="cancel-comment-reply-link" href="' + String(window.location.href).split('#')[0] + '#respond">' + qucreative_options.translate_cancel_comment + '</a></h6>');

        this.onclick = null;
        return false;
      };


    } catch (er) {
    }

    return false;
  },

  I: function (id) {
    return document.getElementById(id);
  }
};
