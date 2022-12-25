const express=require('express')
const {register}=require('../controllers/auth')
const router=express.Router()

const {getAllJobs,getJob,createJob,deleteJob,updateJob}=require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').delete(deleteJob).get(getJob).patch(updateJob)

module.exports=router