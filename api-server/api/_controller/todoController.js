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
        const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.TODO} WHERE done='N'`;
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
            where = `AND id < ${lastId}`;
        }
        const query = `SELECT * FROM ${TABLE.TODO} WHERE done = 'N'${where} order by id desc limit 0, ${len}`;
        const [rows] = await db.execute(query);

        return rows;
    }catch(e){
        console.log(e);
        return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
};

//member list
const getTotal_member = async () => {
    try{
        const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.MEMEMBER_VUE}`;
        const [[{cnt}]] = await db.execute(query);
        return cnt;
    }catch(e){
        console.log(e);
        return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
};

const getList_member = async (req) =>{
    try{
        const seq = parseInt(req.query.seq) || 0;
        console.log(seq);
        const len = parseInt(req.query.len) || 10;
        console.log(len);
        
        let where = "";
        if(seq){
            where = `WHERE mb_seq < ${seq}`;
        }
        const query = `SELECT * FROM ${TABLE.MEMEMBER_VUE} ${where} order by mb_seq desc limit 0, ${len}`;
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
};

//delete member
const member_getSelectOne = async (seq) =>{
    try{
        const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.MEMEMBER_VUE} WHERE mb_seq=?`;
        const values = [seq];
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
        const {title} = req.body;
        console.log(req.body);
        if(isEmpty(title)){
            return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
        }

        try{
                const query = `INSERT INTO todo (title) VALUES (?)`;
                const values = [title];
                const [rows] = await db.execute(query,values); 
                console.log('sucess')
                if (rows.affectedRows == 1){
                    return resData(
                        STATUS.S200.result,
                        STATUS.S200.resultDesc,
                        moment().format('LT'),
                        { id: rows.insertId}
                    );
                }
            
        }catch(e){
            console.log(e.message);
            return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
        }
        
    },

    //member create
    member_create: async(req) =>{

        const {mb_id, mb_pw} = req.body;
        console.log(req.body);
        if(isEmpty(mb_id) || isEmpty(mb_pw)){
            return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
        }
        try{
                const query = `INSERT INTO member_vue (mb_id, mb_pw,mb_ip) VALUES (?,?,?)`;
                const values = [mb_id, mb_pw,'127.0.0.1'];
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


    //list member
        member_list : async (req) => {
            const totalCount = await getTotal_member();
            const list = await getList_member(req);
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

    //update member level
    member_update: async (req) => {
        const { seq } = req.params;
        const {mb_level} = req.body;
        if(isEmpty(seq) || isEmpty(mb_level)){
            return resData(STATUS.E100.result,STATUS.E100.resultDesc,moment().format('LT'));
        }

        try{
            const query = `UPDATE ${TABLE.MEMEMBER_VUE} SET mb_level =? where mb_seq= ?`;
            const values = [mb_level,seq];
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

    //update member passward
    member_change_password: async (req) => {
        const { seq } = req.params;
        const {mb_pw} = req.body;
        if(isEmpty(seq) || isEmpty(mb_pw)){
            return resData(STATUS.E100.result,STATUS.E100.resultDesc,moment().format('LT'));
        }

        try{
            const query = `UPDATE ${TABLE.MEMEMBER_VUE} SET mb_pw =? where mb_seq= ?`;
            const values = [mb_pw,seq];
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

    //delete member 
    member_delete: async(req) => {
        const { seq } = req.params;
        if(isEmpty(seq)){
            return(STATUS.E100.result,STATUS.E100.resultDesc, moment().format('LT'));
        }
        const cnt = await member_getSelectOne(seq);
        try{
            if(!cnt){
                return resData(
                    STATUS.E100.result,
                    STATUS.E100.resultDesc,
                    moment().format('LT')
                );
            }

            const query = `DELETE FROM ${TABLE.MEMEMBER_VUE} where mb_seq = ?`;
            const values = [seq];
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