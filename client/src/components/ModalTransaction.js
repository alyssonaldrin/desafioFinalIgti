import React, { useEffect, useState } from 'react';
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalTransaction({ onSave, onClose, selectedTransaction }) {
    const [camps, setCamps] = useState(selectedTransaction || {
        category: "",
        day: 1,
        description: "",
        month: 1,
        type: "-",
        value: 0,
        year: "",
        yearMonth: "",
        yearMonthDay: ""
    })

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    });

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            onClose();
        }
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = {
            ...camps
        };
        onSave(formData);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        if (event.target.type === "date") {
            const year = value.slice(0, 4);
            const yearMonth = value.slice(0, 7);
            const yearMonthDay = value;
            const day = parseInt(value.slice(8, 10));
            const month = parseInt(value.slice(5, 7));
            setCamps((prevState) => {
                return {
                    ...prevState,
                    year: year,
                    yearMonth: yearMonth,
                    yearMonthDay: yearMonthDay,
                    day: day,
                    month: month
                }
            });
            return;
        }
        console.log(event.target);
        setCamps((prevState) => {
            return {
                ...prevState,
                [event.target.name]: value
            };
        });
    }

    const handleModalClose = () => {
        onClose(null);
    }

    return (
        <div>
            <Modal isOpen={true}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
                    <span style={{ color: "black", fontWeight: "bold", fontSize: "1.3rem" }}>Edição/Adição de Lançamento</span>
                    <button className="waves-effect waves-lights btn red dark-4" onClick={handleModalClose}>X</button>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <div onChange={handleChange} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ marginRight: "10px" }}>
                            <label>
                                <input id="despesa" value="-" name="type" type="radio" />
                                <span color="red">Despesa</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input id="receita" value="+" name="type" type="radio" />
                                <span color="green">Receita</span>
                            </label>
                        </p>
                    </div>
                    <div className="input-field">
                        <input id="description" type="text" name="description" value={camps.description || ""} onChange={handleChange} />
                        <label className="active" htmlFor="description">Descrição</label>
                    </div>
                    <div className="input-field">
                        <input id="category" type="text" name="category" value={camps.category || ""} onChange={handleChange} />
                        <label className="active" htmlFor="category">Categoria</label>
                    </div>
                    <div>
                        <div className="input-field">
                            <input id="value" type="text" name="value" value={camps.value || ""} onChange={handleChange} />
                            <label className="active" htmlFor="value">Valor</label>
                        </div>
                        <input id="date" type="date" onChange={handleChange} value={camps.yearMonthDay} />
                    </div>
                    <button style={{ marginTop: "20px" }} className="waves-effect waves-lights btn">SALVAR</button>
                </form>
            </Modal>
        </div>
    )
}
