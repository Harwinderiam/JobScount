import Job from '../models/JobModel.js';
import {StatusCodes} from 'http-status-codes';


export const getAllJobs = async (req,res) => {
    console.log(req.user);
    const jobs = await Job.find({ })
    res.status(StatusCodes.OK).json({jobs});
}

export const createJob = async (req,res) => {
        const job = await Job.create(req.body);
        res.status(StatusCodes.CREATED).json({ job });
};

export const getSingleJob = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id)
    if (!job) {
      return res.status(404).json({ msg: `No job with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ job });
}

export const updateJob = async (req, res) => {
    const { id } = req.params;
    const updateJob = await Job.findByIdAndUpdate(id,req.body, {new:true});
    if (!updateJob) {
      return res.status(404).json({ msg: `No job with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ msg: 'Job modified', updateJob });
}

export const deleteJob = async  (req, res) => {
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id)
    console.log(removeJob);
    if (!removeJob) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removeJob });
}