Ext.define("accentMobile.model.accentOnlineModel", {
    extend: "Ext.data.Model",
    config: {
        idProperty: 'total_rows',
        fields: [
            { name: 'total_rows', type: 'int' },
            { name: 'offset', type:'string'},
            { name: 'rows', type: 'auto'}
        ]
    }
});