export function replace_font(newval, selector) {
  $(selector).each(function () {
    const _t = $(this);

    var oldNode = _t.get(0),
      newNode = null,
      node,
      nextNode;

    if (newval == "h-group-1" || newval == "h-group-2") {
      newNode = document.createElement("h3");
    } else {
      newNode = document.createElement(newval);
    }

    node = oldNode.firstChild;
    while (node) {
      nextNode = node.nextSibling;
      newNode.appendChild(node);
      node = nextNode;
    }

    let newClass = "";
    if (newval == "h-group-1" || newval == "h-group-2") {
      newClass = "the-variable-heading widget-title " + newval;
    } else {
      newClass = oldNode.className;
      newClass = newClass.replace("h-group-1", "");
      newClass = newClass.replace("h-group-2", "");
    }

    newNode.className = newClass;
    // -- Do attributes too if you need to
    newNode.id = oldNode.id; // -- (Not invalid, they're not both in the tree at the same time)
    oldNode.parentNode.replaceChild(newNode, oldNode);
  });
}
