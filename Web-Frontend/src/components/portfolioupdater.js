import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateSneakers } from '../redux/actions'


export default function PortfolioButton(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const sneakerList = useSelector(state => state.sneakerList);
    if (!user) {
        return(<Link to="/sign-in">Sign In to add to watchlist</Link>);
    }
    var isInList = false;
    for (var i = 0; i < sneakerList.length; i++) {
        if (props.url === sneakerList[i]) {
            isInList = true;
        }
    }

    function updateDB() {
        var AWS = require('aws-sdk');
        AWS.config.update({region: 'us-west-2'});
        var ddb = new AWS.DynamoDB({accessKeyId: "AKIAUZX5JDKL7VXYNI6J", secretAccessKey: "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"});  
        var newDBList = [];
        for (var i = 0; i < sneakerList.length; i++) {
            newDBList.push({'S': sneakerList[i]});
        }
        var updateParams = {
            TableName: 'user_portfolios',
            Key: {
                'uid': {'S': user['uid']}
            },
            UpdateExpression: "SET #Sneakers = :sneakerList",
            ExpressionAttributeNames: {
                "#Sneakers": "Sneakers"
            },
            ExpressionAttributeValues: {
                 ':sneakerList': {'L': newDBList}
            },
            ReturnValues: 'UPDATED_NEW'
        }
        ddb.updateItem(updateParams, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });  
    }
    function handleRemove() {
        // Notify user 
        // Change button to add to watchlist 
        const index = sneakerList.indexOf(props.url);
        if (index > -1) {
            sneakerList.splice(index, 1);
        }
        dispatch(updateSneakers(sneakerList));
        updateDB();
    }

    function handleAdd() {
        const index = sneakerList.indexOf(props.url);
        if (index === -1) {
            console.log("BEFORE PUSH: ", sneakerList);
            sneakerList.push(props.url);
            console.log("AFTER PUSH: ", sneakerList);
            dispatch(updateSneakers(sneakerList));
            updateDB()
        } else {
            console.log("This shouldn't happen");
        }

    }

    if (isInList) {
        return(<button onClick={handleRemove}>Remove from watchlist</button>);
    } else {
        return(<button onClick={handleAdd}>Add to watchlist</button>);
    }
    

    // function addToPortfolio() {
    //     var updateBlurb = "";
    //     ddb.getItem(readParams, function(err, data) {
    //         if (err) {
    //             console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    //         } else {
    //             console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    //             updateBlurb = JSON.stringify(data) === JSON.stringify({}) ? ":sneaker" : "list_append(#Sneakers, :sneaker)";
    //             var updateParams = {
    //                 TableName: 'user_portfolios',
    //                 Key: {
    //                     'uid': {'S': user['uid']}
    //                 },
    //                 UpdateExpression: 'SET #Sneakers = ' + updateBlurb,
    //                 ExpressionAttributeNames: {
    //                     "#Sneakers": "Sneakers"
    //                 },
    //                 ExpressionAttributeValues: {
    //                     ':sneaker': {'L': [{'S': url}]}
    //                 },
    //                 ReturnValues: 'UPDATED_NEW'
    //             }   
    //             ddb.updateItem(updateParams, function(err, data) {
    //                 if (err) {
    //                   console.log("Error", err);
    //                 } else {
    //                   console.log("Success", data);
    //                 }
    //               });  
    //         }
    //     });
    // }
}
