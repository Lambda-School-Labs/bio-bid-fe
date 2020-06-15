import React from 'react';

export default () => {
    return (
        <div>
                        <div style={{display:"Flex", justifyContent:"space-between", padding:"1% 5% 1% 1%", margin:"2% 2% 0 0"}}>
                            <h2 className="welcome-user-name" style={{fontFamily:"PT Sans, sans-serif",}}>Dashboard</h2>
                            <h1 style={{fontFamily:"PT Sans, sans-serif",}}> *Company Name*{}</h1>
                            <h2 style={{fontFamily:"PT Sans, sans-serif",}}>Admin Page</h2>
                        </div>
                            <hr style={{width:"97%", display:"flex", justifyContent:"Center", textDecoration:"underline"}}></hr>
                        <div style={{padding:"1%", margin:"2% 2% 0 0%"}}>
                            <h3 style={{fontFamily:"PT Sans, sans-serif",padding:"1% 0 25% 1%",boxShadow: "8px 10px 16px rgba(0,0,0,0.1)"}}>Regions:</h3>
                            <span style={{display:"flex",justifyContent:"space-between"}}>
                                <button style={{padding:".5%", borderRadius:"5px", backgroundColor:"white"}}>Edit/Delete Regions</button>
                                <button style={{padding:".5%", borderRadius:"5px", backgroundColor:"white"}}>Add Region</button>
                            </span>
                        </div>
                        <div style={{padding:"1%", margin:"2% 2% 0 0"}}>
                            <h3 style={{fontFamily:"PT Sans, sans-serif",padding:"1% 0 25% 1%",boxShadow: "8px 10px 16px rgba(0,0,0,0.1)"}}>Therapeutic Areas:</h3>
                            <span style={{display:"flex", justifyContent:"space-between"}}>
                                <button style={{padding:".5%", borderRadius:"5px", backgroundColor:"white"}}>Edit/Delete Therapeutic Areas</button>
                                <button style={{padding:".5%", borderRadius:"5px", backgroundColor:"white"}}>Add Therapeutic Area</button>
                            </span>
                        </div>
                        <hr style={{width:"97%", display:"flex", justifyContent:"Center", textDecoration:"underline", margin:"2% 0 2% 0%"}}></hr>
                        <div style={{width:"96%", display:"flex", justifyContent:"space-between", padding:"1% 0% 1% 0%", margin:"1% 3% 0 1%"}}>

                            <h4 style={{textDecoration:"underline",maxWidth:"100%", fontFamily:"PT Sans, sans-serif",boxShadow: "8px 10px 16px rgba(0,0,0,0.1)", padding:"5% 15% 20% 15%"}}>Services</h4>
                            <h4 style={{textDecoration:"underline",maxWidth:"100%", fontFamily:"PT Sans, sans-serif",boxShadow: "8px 10px 16px rgba(0,0,0,0.1)", padding:"5% 15% 20% 15%"}}>Specialties</h4>
                        </div>
                    </div>
                )}