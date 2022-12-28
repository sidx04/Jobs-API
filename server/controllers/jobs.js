const Job=require('../models/Job')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,NotFoundError}=require('../errors')

// all job listings for the user
const getAllJobs=async(req,res)=>{
    const jobs=await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({count:jobs.length, jobs})
}

// single job
const getJob=async(req,res)=>{
    const {user:{userId}, params:{id:jobId}}=req

    const job=await Job.findOne({
        _id:jobId,
        createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`no job with ID: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

// add new job to the listing
const createJob=async(req,res)=>{
    req.body.createdBy=req.user.userId
    const job=await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

//  update job
const updateJob=async(req,res)=>{
    res.send('update job')
}

// delete a job
const deleteJob=async(req,res)=>{
    res.send('delete job')
}

module.exports={
    createJob,
    deleteJob,
    getAllJobs,
    getJob,
    updateJob 
}