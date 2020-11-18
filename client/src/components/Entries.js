import React from 'react'
import Entry from './Entry'

export default function Entries({ allTransactions, onDelete, onPersist }) {
    
    const handleDelete = (transaction) => {
        onDelete(transaction);
    }

    const handlePersist = (transaction) => {
        onPersist(transaction);
    }

    return (
        <div>
            {allTransactions.length > 0 && 
                allTransactions.map((transaction) => {
                    return <Entry
                        key={transaction._id}
                        transaction={transaction}
                        onDelete={handleDelete} 
                        onPersist={handlePersist} 
                    />})
            }
        </div>
    )
}
