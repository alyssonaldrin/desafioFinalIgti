import React from 'react'

export default function Search({onPersist, onChangeFilter, filter}) {
    
    const handleClick = () => {
        onPersist();
    }

    const handleInputChange = (event) => {
        onChangeFilter(event.target.value);
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px"
            }}>
            <button style={{marginRight: "10px"}} className="waves-effect waves-light btn" onClick={handleClick}>+ novo lançamento</button>
            <input style={{color: "white"}} value={filter} onChange={handleInputChange} placeholder="Filtro" />
        </div>
    )
}
