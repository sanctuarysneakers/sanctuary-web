export default function shoeDataReformat(data) {
    /* 
    Reformat the condition field of shoes.
    Refromat the source field to remove whitespace and make lower case.
    */
   
    let grailedConditions = {
        "is_gently_used": "Gently Used",
        "is_used": "Used",
        "is_not_specified": "Not Specified",
        "is_new": "New",
        "is_worn": "Worn"
    }

    let goatConditions = {
        "new_no_defects": "New",
        "new_with_defects": "New With Defects",
        "used": "Used",
        "goat_clean": "GOAT Clean"
    }

    let flightClubConditions = {
        "new_no_defects": "New",
        "new_with_defects": "New With Defects",
        "used": "Used",
    }

    let stockxConditions = {
        "New": "New"
    }

    let shoeConditionsMap = {
        "stockx": stockxConditions,
        "goat": goatConditions,
        "grailed": grailedConditions,
        "flightclub": flightClubConditions
    }

    return data.map(shoe => {
        // make lower case and remove white space
        shoe.source = shoe.source.toLowerCase().replace(/\s+/g, '');
        if (shoe.shoe_condition in shoeConditionsMap[shoe.source]) {
            shoe.shoe_condition = shoeConditionsMap[shoe.source][shoe.shoe_condition]
        }
        return shoe
    })
}