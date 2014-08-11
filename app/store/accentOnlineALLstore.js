Ext.define("accentMobile.store.accentOnlineALLstore", {
    extend: "Ext.data.Store",
    // requires: "Ext.data.proxy.JsonP",
    // config: {
    //     id: "accentOnlineALLstore",
    //     model: "accentMobile.model.accentOnlineModel",
    //     proxy: {
    //         type: 'jsonp',
    //         callbackKey: 'callback',
    //         url: 'http://chad:vanilla123@diacritics.iriscouch.com/accents/_all_docs?include_docs=true',
    //         id: 'accent-online-all-store',
    //         //reader:'json'
    //         reader: {
    //             type:'json',
    //             rootProperty:'data',
    //             successProperty:'success'
    //         }
    //     },
    // extend: "Ext.data.TreeStore",
    requires: [
        "Ext.data.proxy.Ajax"
        // "Ext.data.NodeInterface",
        // "Ext.data.reader.Reader"
    ],
    config: {
        id: "accentOnlineALLstore",
        //model: "accentMobile.model.accentOnlineModel",
        model: "accentMobile.model.accentModel",
        proxy: {
            type: 'ajax',
            withCredentials:true,
            useDefaultXhrHeader:false,
            pageParam: undefined,
            extraParams:{
                limit:10000000,
                include_docs:true
            },
            url: 'http://chad:vanilla123@diacritics.iriscouch.com/accents/_all_docs',
            id: 'accent-online-all-store',
            // reader:'json'
            reader: {
                type:'json',
                rootProperty:'rows',
                record:'doc',
                successProperty:'success',
                totalProperty: 'total_rows'
            }
        },
        sorters:[
            {
                property:"term",
                direction:"ASC"
            }
        ],
    // requires: "Ext.data.proxy.Rest",
    // config: {
    //     id: "accentOnlineALLstore",
    //     model: "accentMobile.model.accentOnlineModel",
    //     proxy: {
    //         type: 'rest',
    //         url: 'http://chad:vanilla123@diacritics.iriscouch.com/accents/_all_docs?include_docs=true',
    //         id: 'accent-online-all-store',
    //         //reader:'json'
    //         reader: {
    //             type:'json',
    //             rootProperty:'data',
    //             successProperty:'success'
    //         }
    //     },
        //sorters: [{ property: 'term', direction: 'DESC'}],
        autoLoad:true,
        clearOnLoad: true, //Removes previously existing child nodes before loading

        // listeners:{
        //     load:function(){
        //         // debugger;
        //         // var accentALLstore = Ext.getStore("accentALLstore");
        //         var accentOnlineALLstore = Ext.getStore("accentOnlineALLstore");
        //         debugger;
        //         // accentALLstore.proxy.clear();
        //         // this.rows.each(function(data){
        //         //     accentALLstore.add(data);
        //         // });
        //         // accentALLstore.sync();
        //         // //accentOnlineALLstore.removeAll();
        //     }
        // }
    }
});
//http://diacritics.iriscouch.com/accents/_all_docs?include_docs=true&_dc=1407565428534&page=1&start=0&limit=25