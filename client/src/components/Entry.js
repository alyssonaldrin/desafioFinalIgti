import React from 'react'
import Action from './Action'

export default function Entry({ transaction, onDelete, onPersist }) {
    const { category, description, value, type } = transaction

    const handleActionClick = (transaction, type) => {
        if (type === "delete") {
            onDelete(transaction);
            return
        }
        onPersist(transaction);
    }

    const color = (type === "+") ? style.green : style.red;
    return (
        <div className="card row" style={color}>
            <div className="col s3" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <span>{category}</span>
                <span>{description}</span>
            </div>
            <span className="col s7" style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>{value}</span>
            <div className="col s2" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Action onActionClick={handleActionClick} transaction={transaction} type="edit" />
                <Action onActionClick={handleActionClick} transaction={transaction} type="delete" />
            </div>
        </div>
    )
}

const style = {
    red: {
        backgroundColor: "red"
    },
    green: {
        backgroundColor: "green"
    }
}