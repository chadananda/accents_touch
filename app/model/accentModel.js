Ext.define("accentMobile.model.accentModel", {
    extend: "Ext.data.Model",
    config: {
        idProperty: '_id',
        fields: [
            { name: '_id', type: 'string' },
            { name: 'id', type:'string'},
            { name: 'definition', type: 'string'},
            { name: 'original', type: 'string' },
            { name: 'source', type: 'string' },
            { name: 'term', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'user', type: 'string' },
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: '_id' },
            { type: 'presence', field: 'definition' },
            { type: 'presence', field: 'original' },
            { type: 'presence', field: 'term' },
            { type: 'presence', field: 'type' },
            { type: 'presence', field: 'title', message: 'Please enter a title for this note.' }
        ]
    }
});