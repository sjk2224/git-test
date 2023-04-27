const router = require('express').Router();
const todoController = require('./_controller/todoController');

//create
router.post("/", async (req, res) => {
    const result = await todoController.create(req);
    console.log("sss");
    
    res.json(result);
});

//list
router.get('/', async (req,res) =>{
    const result = await todoController.list(req);
    console.log(result)
    res.json(result);
});

//update
router.put('/:id', async(req,res) => {
    const result = await todoController.update(req);
    res.json(result)
});

//delete
router.delete('/:id', async (req,res)=>{
    const result = await todoController.delete(req);
    res.json(result);
});

//reset
router.post('/reset', async (req,res)=>{
    const result = await todoController.reset(req);
    res.json(result);
});

module.exports = router;