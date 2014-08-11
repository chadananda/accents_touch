Ext.define('accentMobile.view.accentFilteredList', {
    extend: "Ext.Container",
    requires:["Ext.dataview.List","Ext.SegmentedButton"],
    alias: "widget.accentsFilteredListView",

    config: {
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: "toolbar",
                title: "Accents",
                docked: "top",
                items: [
                    { xtype: 'spacer' },
                    {
                        xtype: "button",
                        text: 'New',
                        ui: 'action',
                        itemId: "newButton"
                    }
                ]
            },{
                xtype: 'toolbar',
                ui: 'neutral',
                id: 'TotalAccents',
                docked:"top",
                title:{
                    title: 'Total Accents: xxxx',
                    style:{
                        'text-align':'left'
                    }
                },
                items: [
                    
                    {
                        xtype: 'segmentedbutton',
                        allowDepress:true,
                        items:[
                            {
                                text:'All Accents',
                                itemId: 'AllDisplay',
                                pressed: true
                            },
                            {
                                text:'Filtered Accents',
                                itemId:'FilteredDisplay'
                            }
                        ]
                    },
                    { xtype: "spacer" }
                ]
            },{
                xtype: "list",
                store: "accentFILTERstore",
                itemId:"accentsList",
                loadingText: "Loading Accents...",
                emptyText: "<div>No accents found.</div>",
                itemTpl: "<div class=\"list-item-title\">{term}</div><div class=\"list-item-narrative\">{original}</div>"       
            }

        ],
        listeners: [
            {
                delegate: "#newButton",
                event: "tap",
                fn: "onNewButtonTap"
            }, 
            {
                delegate: "#accentsList",
                event: "disclose",
                fn: "onAccentListDisclose"
            },
            {
                delegate: '#AllDisplay',
                event: "tap",
                fn: "onAllDisplayTap"
            },
            {
                delegate: '#FilteredDisplay',
                event: "tap",
                fn: "onFilteredDisplayTap"
            }
        ]
    },    
    onNewButtonTap: function () {
        console.log("newNoteCommand");
        this.fireEvent("newNoteCommand", this);
    },
    onNotesListDisclose: function (list, record, target, index, evt, options) {
        console.log("editNoteCommand");
        this.fireEvent('editNoteCommand', this, record);
    },
    onAllDisplayTap: function(){
        console.log("onAllDisplayTap");
    },
    onFilteredDisplayTap: function(){
        console.log("onFilteredDisplayTap");
    }
});