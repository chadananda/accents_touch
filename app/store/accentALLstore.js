Ext.define("accentMobile.store.accentALLstore", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        id: "accentALLstore",
        model: "accentMobile.model.accentModel",
        proxy: {
            type: 'localstorage',
            id: 'accent-all-store'
        },
        sorters: [{ property: 'term', direction: 'DESC'}]
    }
    // requires: "Ext.data.proxy.JsonP",
    // config: {
    //     id: "accentALLstore",
    //     model: "accentMobile.model.accentModel",
    //     proxy: {
    //         type: 'jsonp',
    //         callbackKey: 'callback',
    //         url: 'http://chad:vanilla123@diacritics.iriscouch.com/accents/_all_docs?include_docs=true',
    //         id: 'accent-online-all-store',
    //         reader: {
    //             type:'json',
    //             rootProperty:'rows',
    //             successProperty:'success'
    //         }
    //     },
    //     sorters: [{ property: 'term', direction: 'DESC'}],
    //     autoLoad:false,
    // }
});
