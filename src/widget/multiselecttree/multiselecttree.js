/**
 * Created by zcf_1 on 2017/5/11.
 */
BI.MultiSelectTree = BI.inherit(BI.Widget, {
    _defaultConfig: function () {
        return BI.extend(BI.MultiSelectTree.superclass._defaultConfig.apply(this, arguments), {
            baseCls: 'bi-multi-select-tree',
            itemsCreator: BI.emptyFn,
            height: 25
        })
    },

    _init: function () {
        BI.MultiSelectTree.superclass._init.apply(this, arguments);
        var self = this, o = this.options;
        this.storeValue = {value: {}};

        this.adapter = BI.createWidget({
            type: "bi.multi_select_tree_popup",
            itemsCreator: o.itemsCreator
        });
        this.adapter.on(BI.MultiSelectTreePopup.EVENT_CHANGE, function () {
            if (self.trigger.isSearching()) {
                self.storeValue = {value: self.searcherPane.getValue()};
            } else {
                self.storeValue = {value: self.adapter.getValue()};
            }
            self.fireEvent(BI.MultiSelectTree.EVENT_CHANGE);
        });

        this.searcherPane = BI.createWidget({//搜索中的时候用的是parttree，同adapter中的synctree不一样
            type: "bi.multi_tree_search_pane",
            cls: "bi-border-left bi-border-right bi-border-bottom",
            keywordGetter: function () {
                return self.trigger.getKeyword();
            },
            itemsCreator: function (op, callback) {
                op.keyword = self.trigger.getKeyword();
                o.itemsCreator(op, callback);
            }
        });
        this.searcherPane.setVisible(false);

        this.trigger = BI.createWidget({
            type: "bi.searcher",
            isAutoSearch: false,
            isAutoSync: false,
            onSearch: function (op, callback) {
                callback({
                    keyword: self.trigger.getKeyword()
                });
            },
            adapter: this.adapter,
            popup: this.searcherPane,
            height: 200,
            masker: false,
            listeners: [{
                eventName: BI.Searcher.EVENT_START,
                action: function () {
                    self._showSearcherPane();
                    self.storeValue = {value: self.adapter.getValue()};
                    self.searcherPane.setValue(self.storeValue);
                }
            }, {
                eventName: BI.Searcher.EVENT_STOP,
                action: function () {
                    self._showAdapter();
                    // self.storeValue = {value: self.searcherPane.getValue()};
                    self.adapter.setValue(self.storeValue);
                    BI.nextTick(function () {
                        self.adapter.populate();
                    });
                }
            }, {
                eventName: BI.Searcher.EVENT_CHANGE,
                action: function () {
                    if (self.trigger.isSearching()) {
                        self.storeValue = {value: self.searcherPane.getValue()};
                    } else {
                        self.storeValue = {value: self.adapter.getValue()};
                    }
                    self.fireEvent(BI.MultiSelectTree.EVENT_CHANGE);
                }
            }, {
                eventName: BI.Searcher.EVENT_PAUSE,
                action: function () {
                    self._showAdapter();
                }
            }]
        });

        BI.createWidget({
            type: "bi.vtape",
            element: this,
            height: "100%",
            width: "100%",
            items: [{
                el: this.trigger,
                height: 30
            }, {
                el: this.adapter,
                height: "fill"
            }]
        });
        BI.createWidget({
            type: "bi.absolute",
            element: this,
            height: "100%",
            width: "100%",
            items: [{
                el: this.searcherPane,
                top: 30,
                bottom: 0,
                left: 0,
                right: 0
            }]
        })

    },

    _showAdapter: function () {
        this.adapter.setVisible(true);
        this.searcherPane.setVisible(false);
    },

    _showSearcherPane: function () {
        this.searcherPane.setVisible(true);
        this.adapter.setVisible(false);
    },

    resize: function () {

    },

    setValue: function (v) {
        this.storeValue.value = v || {};
        this.adapter.setValue({
            value: v || {}
        });
        this.trigger.setValue({
            value: v || {}
        });
    },

    stopSearch: function () {
        this.trigger.stopSearch();
    },

    updateValue: function (v) {
        this.adapter.updateValue(v);
    },

    getValue: function () {
        return this.storeValue.value;
    },

    populate: function () {
        this.trigger.populate.apply(this.trigger, arguments);
        this.adapter.populate.apply(this.adapter, arguments);
    }
});
BI.MultiSelectTree.EVENT_CHANGE = "BI.MultiSelectTree.EVENT_CHANGE";
BI.shortcut("bi.multi_select_tree", BI.MultiSelectTree);