import React from 'react'
import { useLocation } from 'react-router-dom'

const Choices = () => {
    const {pathname} = useLocation()
    console.log(pathname)
    return (
    <div className='w-[310px] bg-pfe-white border-[1px] rounded-lg shadow-lg absolute right-0 top-12' >
                        <div className='flex flex-col gap-4 py-4 px-4' >
                            {pathname === '/binomes' && (
                                <div>
                                <h1 className='text-xl mb-1' >Section</h1>
                                <div className='grid grid-cols-2' >
                                    <div className='flex flex-col gap-2' >
                                        <div className='flex gap-2' >
                                            <input type="checkbox" />
                                            <label>ACAD A</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" />
                                            <label>ACAD B</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" />
                                            <label>ACAD C</label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2' >
                                    <div className='flex gap-2' >
                                            <input type="checkbox" />
                                            <label>ISIL A</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" />
                                            <label>ISIL B</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )}
                            <div>
                                <h1 className='text-xl mb-1' >PFE Type</h1>
                                <div className='grid grid-cols-2' >
                                    <div className='flex gap-2' >
                                        <input type="checkbox" />
                                        <label>Web</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox" />
                                        <label>Mobile</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox" />
                                        <label>AI</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox" />
                                        <label>Cyber</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className='text-xl mb-1' >Level</h1>
                                <div className='grid grid-cols-2' >
                                    <div className='flex gap-2' >
                                            <input type="checkbox" />
                                            <label>L3</label>
                                    </div>
                                    <div className='flex gap-2' >
                                            <input type="checkbox" />
                                            <label>M2</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default Choices