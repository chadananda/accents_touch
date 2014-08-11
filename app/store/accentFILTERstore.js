Ext.define("accentMobile.store.accentFILTERstore", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        id: "accentFILTERstore",
        model: "accentMobile.model.accentModel",
        proxy: {
            type: 'localstorage',
            id: 'accent-filter-store'
        },
        sorters: [{ property: 'term', direction: 'DESC'}]
    }
});
