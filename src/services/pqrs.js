import { PqrsModel } from "../model/Pqrs.js"
/**
 * find all pqrs in the databases
 * @author Stive Ospina
 * @param {String} [filters] - Criteria to take into account for the search pqrs
 */
const findAllPqrs = async (filters) => {
    let respondePqrs = Object;
    if (filters.date) {
        respondePqrs = await PqrsModel.find({
            date: { $gt: new Date(`${filters.date}T00:00:00.000Z`), $lt: new Date(`${filters.date}T23:59:59.999Z`) }
        }).populate('user');
    }else{
        respondePqrs = await PqrsModel.find(filters,{
            _id: 1, type: 1, description: 1, date:1, areas:1, state:1, civilservant:1
        }).populate('user', {
            fullname:1,
            email:1,
            role:1
        });
    }
    return respondePqrs;
}

const findByIdPqrs = async (id) => {
    const responsePqrs = await PqrsModel.find({ _id: id }).populate('user', {
        fullname:1,
        email:1,
        role:1
    });
    return responsePqrs;
}

const findByUserPqrs = async (idUser) => {
    const responsePqrs = await PqrsModel.find({ user: idUser });
    return responsePqrs;
}

const registerPqrs = async (pqrs) => {
    const responsePqrs = await PqrsModel.create(pqrs);
    return responsePqrs;
}

const updatePqrs = async (id, pqrs) => {
    const responsePqrs = await PqrsModel.findOneAndUpdate({ _id: id }, pqrs, {
        new: true
    });
    return responsePqrs;
}

export { registerPqrs, findAllPqrs, findByIdPqrs, findByUserPqrs, updatePqrs }