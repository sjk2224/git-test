const router = require('express').Router();
const todoController = require('./_controller/todoController');

//create
router.post("/", async (req, res) => {
    const result = await todoController.create(req);
    console.log("sss");
    
    res.json(result);
});

//member create
router.post("/member", async (req, res) => {
    const result = await todoController.member_create(req);
    console.log("aaa");
    
    res.json(result);
});

//list
router.get('/', async (req,res) =>{
    const result = await todoController.list(req);
    console.log(result)
    res.json(result);
});

//list member
router.get('/member', async (req,res) =>{
    const result = await todoController.member_list(req);
    console.log(result)
    console.log('pass')
    res.json(result);
});


//update
router.put('/:id', async(req,res) => {
    const result = await todoController.update(req);
    res.json(result)
});

//update member level
router.put('/member/:seq', async(req,res) => {
    const result = await todoController.member_update(req);
    console.log(result)
    res.json(result)
});

//update change pw
router.put('/member/pw/:seq', async(req,res) => {
    const result = await todoController.member_change_password(req);
    console.log(result)
    res.json(result)
});

//delete
router.delete('/:id', async (req,res)=>{
    const result = await todoController.delete(req);
    res.json(result);
});

//delete member
router.delete('/member/:seq', async (req,res)=>{
    const result = await todoController.member_delete(req);
    res.json(result);
});

//reset
router.post('/reset', async (req,res)=>{
    const result = await todoController.reset(req);
    res.json(result);
});

module.exports = router;