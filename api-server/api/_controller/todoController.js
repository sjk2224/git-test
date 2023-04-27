const { reset } = require('nodemon');
//create
const db = require('../../plugins/mysql');
const TABLE = require('../../util/TABLE');
const STATUS = require('../../util/STATUS');
const { resData, isEmpty} = require('../../util/lib');
const moment = require('../../util/moment');

//list
const getTotal = async () => {
    try{
        const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.TODO}`;
        const [[{cnt}]] = await db.execute(query);
        return cnt;
    }catch(e){
        console.log(e);
        return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
};

const getList = async (req) =>{
    try{
        const lastId = parseInt(req.query.lastId) || 0;
        console.log(lastId);
        const len = parseInt(req.query.len) || 10;
        console.log(len);
        
        let where = "";
        if(lastId){
            where = `WHERE id < ${lastId}`;
        }
        const query = `SELECT * FROM ${TABLE.TODO} ${where} order by id desc limit 0, ${len}`;
        const [rows] = await db.execute(query);

        return rows;
    }catch(e){
        console.log(e);
        return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
};

//delete
const getSelectOne = async (id) =>{
    try{
        const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.TODO} WHERE id=?`;
        const values = [id];
        const[[{cnt}]] = await db.execute(query, values);
        return cnt;
    }catch(e){
        console.log(e);
        return resData(STATUS.E300.result,STATUS.E300.resultDesc, moment().format('LT'));
    }
}

const todoController = {

    async getTest(){
        const query =  `SELECT * FROM vue.todo`;
        const [[rows]] = await db.execute(query);
        console.log(rows);
        return rows;
    },

    //create
    create: async (req) => {
        const {title, done} = req.body;
        if(isEmpty(title) || isEmpty(done)){
            return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
        }

        try{
                const query = `INSERT INTO todo (title, done) VALUES (?,?)`;
                const values = [title, done];
                const [rows] = await db.execute(query,values); 
                if (rows.affectedRows == 1){
                    return resData(
                        STATUS.S200.result,
                        STATUS.S200.resultDesc,
                        moment().format('LT')
                    );
                }
            
        }catch(e){
            console.log(e.message);
            return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
        }
        
    },

    //list
    list: async (req) => {
        const totalCount = await getTotal();
        const list = await getList(req);
        console.log(totalCount);
        if(totalCount > 0 && list.length){
            return resData(
                STATUS.S200.result,
                STATUS.S200.resultDesc,
                moment().format('LT'),
                {totalCount, list}
            );
        }else{
            return resData(STATUS.S201.result,STATUS.S201.resultDesc,moment().format('LT'));
        }
    },

    //update
    update: async (req) => {
        const { id } = req.params;
        const {title, done} = req.body;
        if(isEmpty(id) || isEmpty(title) || isEmpty(done)){
            return resData(STATUS.E100.result,STATUS.E100.resultDesc,moment().format('LT'));
        }

        try{
            const query = `UPDATE ${TABLE.TODO} SET title =?, done =? where id= ?`;
            const values = [title,done,id];
            const [rows] = await db.execute(query,values);
            if (rows.affectedRows ==1 ){
                return resData(
                    STATUS.S200.result,
                    STATUS.S200.resultDesc,
                    moment().format('LT')
                );
            }
        }catch(e){
            console.log(e);
            return resData(STATUS.E300.result, STATUS.E300.resultDesc , moment().format('LT'));
        }
    
    },
    
    //delete
    delete: async(req) => {
        const { id } = req.params;
        if(isEmpty(id)){
            return(STATUS.E100.result,STATUS.E100.resultDesc, moment().format('LT'));
        }
        const cnt = await getSelectOne(id);
        try{
            if(!cnt){
                return resData(
                    STATUS.E100.result,
                    STATUS.E100.resultDesc,
                    moment().format('LT')
                );
            }

            const query = `DELETE FROM ${TABLE.TODO} where id = ?`;
            const values = [id];
            const [rows] = await db.execute(query, values);
            if(rows.affectedRows == 1){
                return resData(
                    STATUS.S200.result,
                    STATUS.S200.resultDesc,
                    moment().format('LT')
                );
            }
        }catch(e){
            console.log(e);
            return resData(STATUS.E300.result,STATUS.E300.resultDesc,moment().format());
        }
        return rows;
    },

    //reset
    reset: async(req) => {
        //turncate
        try{
            const query = `TRUNCATE TABLE ${TABLE.TODO}`;
            await db.execute(query);
        }catch(e){
            console.log(e.message);
            return resData(STATUS.E300.result,STATUS.E300.resultDesc,moment().format('LT'));
        }

        const {title} = req.body;
        const done = req.body.done || "N";
        const len = req.body.len || 100;
        if(isEmpty(title)){
            return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
        }

        try{
            let query = `INSERT INTO todo (title,done) VALUES `;
            let arr = [];
            for (let i = 0; i < len; i++){
                arr.push(`('${title}_${i}','${done}')`);
            }
            query = query + arr.join(",");
            const [rows] = await db.execute(query);

            if(rows.affectedRows != 0){
                return resData(
                    STATUS.S200.result,
                    STATUS.S200.resultDesc,
                    moment().format('LT')
                );
            }
        }catch(e){
            console.log(e.message);
            return resData(
                STATUS.E300.result,
                STATUS.E300.resultDesc,
                moment().format('LT')
                );
        }
    },
}
module.exports = todoController;