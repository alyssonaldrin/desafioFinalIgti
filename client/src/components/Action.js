import React from 'react'

export default function Action({type, onActionClick, transaction}) {
    const handleIconClick = () => {
        onActionClick(transaction, type);
    }
    return <span className="material-icons" onClick={handleIconClick} style={{cursor: "pointer"}}>{type}</span>
}