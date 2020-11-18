const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
    try {
        const transaction = new TransactionModel(req.body);
        await transaction.save();
        res.send({ message: 'Transação inserida com sucesso' });
    } catch (error) {
        res.status(500).send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    }
};

const findAll = async (req, res) => {
    const period = req.query.period;

    try {
        const transactions = await TransactionModel.find({ yearMonth: period });
        res.send(transactions);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Erro ao listar todos os documentos' });
    }
};

const update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Dados para atualizacao vazio',
        });
    }
    const { _id: id, description, category, year, month, day, yearMonth, yearMonthDay, type, value } = req.body;
    try {
        const transaction = await TransactionModel.findByIdAndUpdate(
            { _id: id },
            { "description": description, 
                "category": category, 
                "year": year, 
                "month": month, 
                "day": day, 
                "yearMonth": yearMonth,
                "yearMonthDay": yearMonthDay,
                "type": type,
                "value": value},
            { new: true }
        );
        await transaction.save();
        res.send(transaction);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar a Transação id: ' + id });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    try {
        const transaction = await TransactionModel.findByIdAndDelete({ _id: id });
        res.send("Deletado com sucesso!");
    } catch (error) {
        res.status(500).send({ message: 'Nao foi possivel deletar a Transação id: ' + id });
    }
};

const summary = async (req, res) => {
    const period = req.query.period;

    try {
        const count = await TransactionModel.countDocuments({ yearMonth: period });
        const positives = await TransactionModel.aggregate([{
            $match: {
                $and: [{
                    yearMonth: period
                }, {
                    type: "+"
                }]
            }
        }, {
            $group: {
                _id: null,
                positives: {
                    $sum: "$value"
                }
            }
        }]);
        const negatives = await TransactionModel.aggregate([{
            $match: {
                $and: [{
                    yearMonth: period
                }, {
                    type: "-"
                }]
            }
        }, {
            $group: {
                _id: null,
                negatives: {
                    $sum: "$value"
                }
            }
        }]);
        const response = {
            positives: positives[0].positives,
            negatives: negatives[0].negatives,
            saldo: positives[0].positives - negatives[0].negatives,
            count
        }
        res.send(response);
    } catch (error) {
        res.status(500).send({ message: error.message || 'Erro ao listar todos os documentos' });
    }
};

module.exports = { create , findAll , remove, update, summary };