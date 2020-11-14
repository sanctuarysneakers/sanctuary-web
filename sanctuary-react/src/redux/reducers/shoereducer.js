let initState = {
    size: 0,
    price: 0,
    url: "",
    model: "",
    source: "",
    image: "",
    shoe_condition: "",
    sku_id: ""
}

const shoeReducer = (state = initState, action) => {
    switch(action.type) {
        case 'UPDATE_SHOE':
            return action.payload
        default:
            return state
    }
}

export default shoeReducer