import React from 'react'
import Entry from './Entry'

export default function Entries({ filteredTransactions, onDelete, onPersist }) {
    
    const handleDelete = (transaction) => {
        onDelete(transaction);
    }

    const handlePersist = (transaction) => {
        onPersist(transaction);
    }

    return (
        <div>
            {filteredTransactions.length > 0 && 
                filteredTransactions.map((transaction) => {
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
