Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'taco',
    items:[{
        html:'<a href="https://help.rallydev.com/apps/2.0rc1/doc/#!/api/Rally.data.WsapiDataStore">Hint!<a>'
    }],
    fireFromTheStore:function(store,records){
        var blockedRecords = _.filter(records,function(record){
            var blocked = record.get('Blocked')
            // console.log(blocked,record);
            return blocked;
        }); 
        var record = records[0];
    
        record.set("Blocked",true);
        record.save({
            callback: function(result, operation) {
                if(operation.wasSuccessful()) {
                    //Get the new defect's objectId
                    console.log(result.get('Name')+" saved");
                }
            }
        });
        Ext.Msg.alert('Status', 'Store Loaded with '+records.length+' records and '+blockedRecords.length + ' blocked records.');
    },

    launch: function() {
        //We start here!
        var store = Ext.create('Rally.data.WsapiDataStore', {
            model: 'User Story',
            listeners: {
                load: function(store, data, success) {
                    //process data
                    console.log(data);
                }
            },
            filters: [
        {
            property: 'Blocked',
            value: false
        }
    ],
            autoLoad:true,
            fetch: true
        });
        store.on("load",this.fireFromTheStore);
    }
});
