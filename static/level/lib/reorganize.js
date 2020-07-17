let REOrganizer = (function () {
    let _selector = null;
    function _init(selector) {
        _selector = selector;
    }
    function _organize(sort, reverse, filter) {
        let items = $(_selector).sort(function (a,b) { return $(a).data(sort) < $(b).data(sort) ? -1 : 1; });
        if (reverse) { items = items.toArray().reverse(); }
        $(items).each(function(index, item) {
            $(item).css('order', index);
            if (filter === 'none' || $(item).data('tags').includes(filter)) {
                $(item).show();
            } else {
                $(item).hide();
            }
        });
    }
    return {
        init: _init,
        organize: _organize
    };
})();