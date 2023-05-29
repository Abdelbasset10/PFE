const mongoose = require("mongoose");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find({});
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate({
      path: "hisBinome hisTeacher",
      select: "name email section",
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const getStudentAndUpdate = await Student.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    const token = jwt.sign(
      {
        userId: getStudentAndUpdate._id,
        userName: getStudentAndUpdate.name,
        userType: "student",
      },
      "JWT_SECRET",
      { expiresIn: "1d" }
    );
    return res.status(200).json({ token, user: getStudentAndUpdate });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const getStudentAndDelete = await Student.findByIdAndDelete(id);
    res.status(200).json(getStudentAndDelete);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllNoBinomes = async (req, res) => {
  try {
    const noBinomes = await Student.find({ isBinome: false });
    res.status(200).json(noBinomes);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getAllBinomes = async (req, res) => {
  try {
    const noBinomes = await Student.find({ isBinome: true });
    res.status(200).json(noBinomes);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const searchStudent = async (req, res) => {
  try {
    const { userName } = req.query;
    const user =
      (await Student.findOne({ name: userName })) ||
      (await Teacher.findOne({ name: userName })) ||
      (await Admin.findOne({ name: userName }));
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const searchNoBinome = async (req, res) => {
  try {
    const { userName } = req.query;
    const noBinomes = await Student.find({ isBinome: false });
    const users = await noBinomes.filter((f) => f.name.startsWith(userName));
    if (users.length === 0) {
      const result = [];
      return res.status(200).json(result);
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getStudentsBySection = async (req, res) => {
  try {
    const { section } = req.query;
    const sec = new RegExp(section, "i");
    const students = await Student.find({ section: sec });
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addBinome = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;
    const Me = await Student.findById(studentId);
    const myBinome = await Student.findById(id);
    if (Me.isBinome === true && Me.hisBinome) {
      return res.status(400).json({ message: "You already have binome !!" });
    }
    if(myBinome.isBinome === true && myBinome.hisBinome) {
      return res
        .status(400)
        .json({ message: "This Student has already a  binome !!" });
    }
    if(Me.lvl !== myBinome.lvl){
      return res.status(400).json({message:`the level of this student is not ${Me.lvl} !`})
    }
    await Me.updateOne({ isBinome: true, hisBinome: myBinome._id });
    await myBinome.updateOne({ isBinome: true, hisBinome: Me._id });
    return res
      .status(200)
      .json({ message: "You have been added Binome succesffully !" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const BeNoBinome = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;
    const Me = await Student.findById(studentId);
    const myBinome = await Student.findById(id);
    if (Me.isBinome === false && !Me.hisBinome) {
      return res
        .status(401)
        .json({ message: "You already dont't have binome !!" });
    }
    if (myBinome.isBinome === false && !myBinome.hisBinome) {
      return res
        .status(401)
        .json({ message: "This Student has already no binome !!" });
    }
    await Me.updateOne({ isBinome: false, hisBinome: null });
    await myBinome.updateOne({ isBinome: false, hisBinome: null });
    return res.status(200).json({ message: "You are now without Binome !" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const addTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { myId, binomeId } = req.body;
    const me = await Student.findById(myId);
    if (!me.isBinome) {
        return res
        .status(400)
        .json({ message: "You have to find Binome before request Encadreur!" });
    }
    const myBinome = await Student.findById(binomeId);
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "This teacher does not exist !" });
    }
    if (me.hisTeacher.includes(teacher._id)) {
      return res
        .status(400)
        .json({ message: "This Teacher is already in your encadreurs" });
    }
    await me.updateOne({ $push: { hisTeacher: teacher } });
    await myBinome.updateOne({ $push: { hisTeacher: teacher } });
    await teacher.updateOne({ $push: { studentsVision: [me, myBinome] } });
    const updatedMe = await Student.findById(me._id);
    const token = jwt.sign(
      { userId: updatedMe._id, userName: updatedMe.name, userType: "student" },
      "JWT_SECRET",
      { expiresIn: "1d" }
    );
    return res.status(200).json({ token, user: updatedMe });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const removeTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { myId, binomeId } = req.body;
    const me = await Student.findById(myId);
    if (!me.isBinome) {
      return res
        .status(400)
        .json({ message: "You have to find Binome before request Encadreur!" });
    }
    const myBinome = await Student.findById(binomeId);
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "This teacher does not exist !" });
    }
    if (!me.hisTeacher.includes(teacher._id)) {
      return res
        .status(400)
        .json({ message: "This Teacher is not in your encadreurs list" });
    }
    await me.updateOne({ $pull: { hisTeacher: teacher._id } });
    await myBinome.updateOne({ $pull: { hisTeacher: teacher._id } });
    await teacher.updateOne({ $pull: { studentsVision: me._id } });
    await teacher.updateOne({ $pull: { studentsVision: myBinome._id } });
    const updatedMe = await Student.findById(me._id);
    const token = jwt.sign(
      { userId: updatedMe._id, userName: updatedMe.name, userType: "student" },
      "JWT_SECRET",
      { expiresIn: "1d" }
    );
    return res.status(200).json({ token, user: updatedMe });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getAllNoBinomes,
  getAllBinomes,
  searchStudent,
  searchNoBinome,
  addBinome,
  BeNoBinome,
  addTeacher,
  removeTeacher,
  getStudentsBySection,
};
