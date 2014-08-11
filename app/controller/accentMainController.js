Ext.define("accentMobile.controller.accentMainController", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            accentsAllListView: "accentsAllListView",
            accentsFilteredListView: "accentsFilteredListView",
            accentsList: "#accentsList" //hopefully works on both the Filtered and All Lists
        },
        control: {
            accentsAllListView: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand"
            },
            accentsFilteredListView: {
                // The commands fired by the notes list container.
                newNoteCommand: "onNewNoteCommand",
                editNoteCommand: "onEditNoteCommand"
            },
            accentsList:{
                show:'loadAccentData'
            }
            // noteEditorView: {
            //     // The commands fired by the note editor.
            //     saveNoteCommand: "onSaveNoteCommand",
            //     deleteNoteCommand: "onDeleteNoteCommand",
            //     backToHomeCommand: "onBackToHomeCommand"
            // }

        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    activateNoteEditor: function (record) {

        var noteEditorView = this.getNoteEditorView();
        noteEditorView.setRecord(record); // load() is deprecated.
        Ext.Viewport.animateActiveItem(noteEditorView, this.slideLeftTransition);
    },
    activateNotesList: function () {
        Ext.Viewport.animateActiveItem(this.getaccentsAllListView(), this.slideRightTransition);
    },

    // Commands.
    onNewNoteCommand: function () {

        console.log("onNewNoteCommand");

        var now = new Date();
        var noteId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();

        var newNote = Ext.create("NotesApp.model.Note", {
            id: noteId,
            dateCreated: now,
            title: "",
            narrative: ""
        });

        this.activateNoteEditor(newNote);

    },
    onEditNoteCommand: function (list, record) {

        console.log("onEditNoteCommand");

        this.activateNoteEditor(record);
    },
    onSaveNoteCommand: function () {

        console.log("onSaveNoteCommand");

        var accentsAllListView = this.getaccentsAllListView();

        var currentAccent = accentsAllListView.getRecord();
        var newValues = accentsAllListView.getValues();

        // Update the current note's fields with form values.
        currentAccent.set("title", newValues.title);
        currentAccent.set("narrative", newValues.narrative);

        var errors = currentAccent.validate();

        if (!errors.isValid()) {
            Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
            currentAccent.reject();
            return;
        }

        var accentStore = Ext.getStore("accentALLstore");

        if (null == accentStore.findRecord('_id', currentNote.data.id)) {
            accentStore.add(currentNote);
        }

        accentStore.sync();

        accentStore.sort([{ property: 'term', direction: 'DESC'}]);

        this.activateNotesList();
    },
    onDeleteNoteCommand: function () {

        console.log("onDeleteNoteCommand");

        var noteEditorView = this.getNoteEditorView();
        var currentNote = noteEditorView.getRecord();
        var notesStore = Ext.getStore("accentALLstore");

        notesStore.remove(currentNote);
        notesStore.sync();

        this.activateNotesList();
    },
    onBackToHomeCommand: function () {

        console.log("onBackToHomeCommand");
        this.activateNotesList();
    },
    loadAccentData: function(){
        console.log("show initiated");
    },
    onloadOnlineData: function(){
        //var accentALLstore = Ext.getStore("accentALLstore");
        var accentOnlineALLstore = Ext.getStore("accentOnlineALLstore");
        var tempData = [];
        debugger;
        //accentALLstore.load();
        //accentALLstore.proxy.clear();
        accentOnlineALLstore.each(function(data){
            console.log(data);
            var item_counter = 0;
            var total_rows = data.data.total_rows;
            data.data.rows.forEach(function(item){
                item_counter++;
                console.log("pushing item "+item_counter+"/"+data.total_rows);
                tempData.push(item.doc);
            });
        });
        // for(var x=0;x<tempData.length;x++)
        // {
        //     for(var y=1;y<tempData.length;y++)
        //     {
        //         //debugger;
        //         if(tempData[x].term>tempData[y].term)
        //         {
        //             var tempHolder = tempData[x];
        //             tempData[x]=tempData[y];
        //             tempData[y]=tempHolder;
        //         }
        //     }
        // }
        console.log("start sort");
        tempData.sort(this.customCompareSort('term'));
        console.log("end sort");
        var counter=0;
        accentOnlineALLstore.removeAll();
        tempData.forEach(function(data){
            counter++;
            console.log("pushing item "+counter);
            //accentALLstore.add(data);
            accentOnlineALLstore.add(data);
        });
        debugger;
        console.log("sync start");
        //accentALLstore.sync();
        accentOnlineALLstore.sync();
        console.log("sync done");
        //accentOnlineALLstore.removeAll();
    },
    updateTotal:function(){
        var accentStore = Ext.getStore("accentOnlineALLstore");
        var title={
            title: 'Total Accents: '+accentStore._totalCount,
            style:{
                'text-align':'left'
            }
        };
        //debugger;
        Ext.getCmp('TotalAccents').setTitle(title);
    },
    customCompareSort:function(prop){
        return function(a,b){
            return parseInt(a[prop]) - parseInt(b[prop]);
        };
    },
    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
        var accentStore = Ext.getStore("accentOnlineALLstore");
        accentStore.on({
            load:'updateTotal',
            scope: this
        });
        accentStore.load();
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});