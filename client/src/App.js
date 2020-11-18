import React, { useEffect, useState } from 'react';
import Entries from './components/Entries';
import ModalTransaction from './components/ModalTransaction';
import Search from './components/Search';
import Summary from './components/Summary';

import controller from "./services/TransactionService.js";

export default function App() {
    const [yearMonth, setYearMonth] = useState('2019-01');
    const [allTransactions, setAllTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState("");
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [isModalOn, setIsModalOn] = useState(false);
    const [summary, setSummary] = useState({
        positives: 0,
        negatives: 0,
        saldo: 0,
        count: 0
      });

    useEffect(() => {
        retrieveTransactions(yearMonth);
    }, [yearMonth]);
    
    const retrieveTransactions = async (yearMonth) => {
        const transactions = await controller.findAll(yearMonth);
        const summaryData = await controller.summary(yearMonth);
        setAllTransactions(transactions);
        setSummary(summaryData);
    }

    const refreshList = () => {
        retrieveTransactions(yearMonth);
    };

    useEffect(() => {
        const filterLowerCase = filter.toLowerCase();
        const newFilteredTransactions = allTransactions.filter((transaction) => {
            return transaction.description.toLowerCase().includes(filterLowerCase);
        })
        setFilteredTransactions(newFilteredTransactions);
    }, [filter, allTransactions])

    const handleChange = (event) => {
        setYearMonth(event.target.value);
    }

    const handleDelete = async (transaction) => {
        await controller.remove(transaction._id);
        refreshList();
    }

    const handlePersist = async (transaction = {}) => {
        if (transaction === {}) {
            transaction = {
                category: "",
                day: 1,
                description: "",
                month: 1,
                type: "-",
                value: 0,
                year: "",
                yearMonth: "",
                yearMonthDay: ""
            }
        }
        setSelectedTransaction(transaction);
        setIsModalOn(true);
    }

    const handlePersistData = async (formData) => {
        const found = allTransactions.find(transaction => {
            return transaction._id === formData._id
        })
        if (found) {
            await controller.update(formData);  
        } else {
            await controller.create(formData);
        }
        refreshList();
        setIsModalOn(false);
    }

    const handleClose = () => {
        setIsModalOn(false);
    }

    const handleChangeFilter = (newFilter) => {
        setFilter(newFilter);
    }

    return (
        <div className="container">
            <h1 className="center">Controle Financeiro Pessoal</h1>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <select value={yearMonth} onChange={handleChange} className="browser-default" style={{
                    maxWidth: "200px",
                    marginLeft: "10px",
                    marginRight: "10px",
                    color: "black"
                }}>
                    <option value="2019-01">2019/01</option>
                    <option value="2019-02">2019/02</option>
                    <option value="2019-03">2019/03</option>
                    <option value="2019-04">2019/04</option>
                    <option value="2019-05">2019/05</option>
                    <option value="2019-06">2019/06</option>
                    <option value="2019-07">2019/07</option>
                    <option value="2019-08">2019/08</option>
                    <option value="2019-09">2019/09</option>
                    <option value="2019-10">2019/10</option>
                    <option value="2019-11">2019/11</option>
                    <option value="2019-12">2019/12</option>
                    <option value="2020-01">2020/01</option>
                    <option value="2020-02">2020/02</option>
                    <option value="2020-03">2020/03</option>
                    <option value="2020-04">2020/04</option>
                    <option value="2020-05">2020/05</option>
                    <option value="2020-06">2020/06</option>
                    <option value="2020-07">2020/07</option>
                    <option value="2020-08">2020/08</option>
                    <option value="2020-09">2020/09</option>
                    <option value="2020-10">2020/10</option>
                    <option value="2020-11">2020/11</option>
                    <option value="2020-12">2020/12</option>
                    <option value="2021-01">2021/01</option>
                    <option value="2021-02">2021/02</option>
                    <option value="2021-03">2021/03</option>
                    <option value="2021-04">2021/04</option>
                    <option value="2021-05">2021/05</option>
                    <option value="2021-06">2021/06</option>
                    <option value="2021-07">2021/07</option>
                    <option value="2021-08">2021/08</option>
                    <option value="2021-09">2021/09</option>
                    <option value="2021-10">2021/10</option>
                    <option value="2021-11">2021/11</option>
                    <option value="2021-12">2021/12</option>
                </select>
            </div>
            <Summary summary={summary} />
            <Search filter={filter} onChangeFilter={handleChangeFilter} onPersist={handlePersist} />
            <Entries onDelete={handleDelete} onPersist={handlePersist} filteredTransactions={filteredTransactions} />
            {isModalOn && <ModalTransaction onSave={handlePersistData} onClose={handleClose} selectedTransaction={selectedTransaction} />}
        </div>
    )
};