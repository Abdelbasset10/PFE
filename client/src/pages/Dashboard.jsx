import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import StatUsers from '../components/StatUsers'
import cat from '../assets/Cat03.jpg'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { allStudents, getBinomes, getNoBinomes } from '../redux/features/studentSlice';
import { allEncadreurs } from '../redux/features/teacherSlice';
import { allSubjects } from '../redux/features/subjectSlice';
import PieChart from '../components/PieChart';
import { BarChart } from '../components/BarChart';
import Navbar from '../components/Navbar';

Chart.register(CategoryScale);


const Dashboard = () => {
  const dispatch = useDispatch()
    const {students, noBinomesCopy, binomes} = useSelector((state)=>state.student)
    const {encadreursCopy} = useSelector((state)=>state.teacher)
    const {subjectsCopy} = useSelector((state)=>state.subject)
    let mobileLength = subjectsCopy.filter((s)=>s.subjectField === "mobile")
    mobileLength = mobileLength.length
    let webLength = subjectsCopy.filter((s)=>s.subjectField === "web")
    webLength = webLength.length
    let aiLength = subjectsCopy.filter((s)=>s.subjectField === "ai")
    aiLength = aiLength.length
    let cyberLength = subjectsCopy.filter((s)=>s.subjectField === "cyber")
    cyberLength = cyberLength.length
    


  const [chartData, setChartData] = useState({
    labels:['Binome', 'Monome'] , 
    datasets: [
      {
        label: "Users Gained ",
        data: [binomes.length,noBinomesCopy.length],
        backgroundColor: [
          "#4268EE", "#FBC02D"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const [chartData2, setChartData2] = useState({
    labels:['Mobile', 'Web',"Ai","Cyber"] , 
    datasets: [
      {
        label: "Users Gained ",
        data:[mobileLength,webLength,aiLength,cyberLength] ,
        backgroundColor: [
          "#4268EE"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  useEffect(()=>{
    dispatch(allStudents())
    dispatch(allEncadreurs())
    dispatch(allSubjects())
    dispatch(getNoBinomes())
    dispatch(getBinomes())
},[])
  return (
    <>
    <Navbar />
    <div className='flex'>
      <Sidebar />
      <div className='flex-[9]  '>
        <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
          <StatUsers />
          <div className='flex flex-col mt-8' >
            <PieChart chartData={chartData} />
            <div className='flex-[1] border-[pfe-blac] border-[1px] px-4 py-2 h-[20rem] overflow-y-auto' >
              <h1 className='text-xl text-pfe-blue mb-4' >La liste des encadreurs </h1>
              <div className='flex justify-between items-center' >
                <p>Encadreur</p>
                <p>Pfe Type</p>
              </div>
              <div className='flex flex-col gap-4 mt-4' >
                {encadreursCopy.map((e,index)=>{
                  return (
                    <div key={index} >
                      <div className='flex items-center justify-between' >
                        <div className='flex gap-2 items-center' >
                          <img src={cat} alt="profImg" className='w-10 h-10 rounded-[50%]'/>
                          <p>{e.name}</p>
                        </div>
                        <p className='' >{e.pfeType}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
          <BarChart chartData={chartData2} />
        </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard