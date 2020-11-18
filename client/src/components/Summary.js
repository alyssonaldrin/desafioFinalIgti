import React from 'react'

export default function Summary({ summary }) {
    const { count, positives, negatives, saldo } = summary;

    return (
        <div style={{
            marginTop: "30px",
            border: "1px solid lightgrey",
            display: "flex",
            justifyContent: "space-between"
        }}>
            <p style={style.p}>Lançamentos: <span>{count}</span></p>
            <p style={style.p}>Receitas: <span>{positives}</span></p>
            <p style={style.p}>Despesas: <span>{negatives}</span></p>
            <p style={style.p}>Saldo: <span>{saldo}</span></p>
        </div>
    )
}

const style = {
    p: {
        marginTop: "0px",
        marginBottom: "0px"
    }
}